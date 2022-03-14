using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TechnicalTestMagniFinance.Models;
using TechnicalTestMagniFinance.Controllers;
using System.Web.Mvc;
using System.Transactions;

namespace TechnicalTestMagniFinanceTests
{
    /// <summary>
    /// Descrição resumida para CollegeUnitTests
    /// </summary>
    [TestClass]
    public class CollegeUnitTests
    {
        private TransactionScope transScope;

        // utilize transaction scope to revert changes to database
        [TestInitialize()]
        public void CollegeUnitTestsInitialize()
        {
            transScope = new TransactionScope();
        }

        //dispose changes after test
        [TestCleanup()]
        public void CollegeUnitTestsCleanup()
        {
            transScope.Dispose();
        }

        [TestMethod]
        public void GetListCourseInfos()
        {
            CourseController co = new CourseController();

            JsonResult dto = co.GetListCourseInfos();

            List<CourseInfosDTO> infos = (List<CourseInfosDTO>)dto.Data;


            // use infos of course Biology
            Assert.IsTrue(infos[0].Name.TrimEnd() == "Biology");

            int studentCount = infos[0].StudentCount;

            using (var db = new MagniFinanceEntities())
            {
                Student student1 = new Student();

                Student student2 = new Student();
                student1 = db.Students.Add(student1);
                student2 = db.Students.Add(student2);

                db.SaveChanges();


                Grade grade1 = new Grade();
                grade1.StudentId = student1.Id;
                grade1.SubjectId = 1;
                Grade grade2 = new Grade();
                grade2.StudentId = student2.Id;
                grade2.SubjectId = 1;

                // grade1
                db.Grades.Add(grade1);
                db.Grades.Add(grade2);

                db.SaveChanges();


                dto = co.GetListCourseInfos();

                infos = (List<CourseInfosDTO>)dto.Data;

                // assert if the 2 new students enrolled are counting towards infos
                Assert.IsTrue(studentCount == (infos[0].StudentCount - 2));
            }            
        }

        [TestMethod]
        public void GetListSubjectInfos()
        {
            SubjectController sub = new SubjectController();

            JsonResult dto = sub.GetListSubjectInfos();

            List<SubjectInfosDTO> infos = (List<SubjectInfosDTO>)dto.Data;


            // use infos of subject Animals 101
            Assert.IsTrue(infos[0].SubjectName.TrimEnd() == "Animals 101");

            int? studentCount = infos[0].StudentCount;

            using (var db = new MagniFinanceEntities())
            {
                Student student1 = new Student();

                Student student2 = new Student();
                student1 = db.Students.Add(student1);
                student2 = db.Students.Add(student2);

                db.SaveChanges();


                Grade grade1 = new Grade();
                grade1.StudentId = student1.Id;
                grade1.SubjectId = 1;
                Grade grade2 = new Grade();
                grade2.StudentId = student2.Id;
                grade2.SubjectId = 1;

                // grade1
                db.Grades.Add(grade1);
                db.Grades.Add(grade2);

                db.SaveChanges();


                dto = sub.GetListSubjectInfos();

                infos = (List<SubjectInfosDTO>)dto.Data;

                // assert if the 2 new students enrolled are counting towards infos
                Assert.IsTrue(studentCount == (infos[0].StudentCount - 2));
            }
        }

        [TestMethod]
        public void GetStudentGrades()
        {
            using (var db = new MagniFinanceEntities())
            {
                Student student1 = new Student();

                student1 = db.Students.Add(student1);

                db.SaveChanges();

                StudentController stu = new StudentController();

                JsonResult dto = stu.GetStudentGrades(student1.Id);

                List<StudentGradesDTO> infos = (List<StudentGradesDTO>)dto.Data;

                // make sure the new student doesn't have any grades
                Assert.AreEqual(0, infos.Count);

                Grade grade = new Grade();
                grade.StudentId = student1.Id;
                grade.SubjectId = 1;

                grade = db.Grades.Add(grade);

                db.SaveChanges();

                dto = stu.GetStudentGrades(student1.Id);

                infos = (List<StudentGradesDTO>)dto.Data;

                // now the new student should have exactly one grade
                Assert.AreEqual(1, infos.Count);


            }
        }
    }
}
