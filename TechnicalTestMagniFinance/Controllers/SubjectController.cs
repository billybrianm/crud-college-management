using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using TechnicalTestMagniFinance.Models;

namespace TechnicalTestMagniFinance.Controllers
{
    public class SubjectController : Controller
    {
        // List ALL Subjects
        // GET Subject/GetSubjects
        [HttpGet]
        public JsonResult GetSubjects()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Subject> subjects = db.Subjects.Include(sub => sub.Course).Include(sub => sub.Teacher).ToList();
               

                return Json(subjects, JsonRequestBehavior.AllowGet);
            }
        }

        // List Subjects with Infos
        // GET Subject/GetListSubjectInfos
        [HttpGet]
        public JsonResult GetListSubjectInfos()
        {
            using (var db = new MagniFinanceEntities())
            {
                string query = "select s.ID as SubjectID, s.Name as SubjectName, t.Name as TeacherName, t.Birthday as TeacherBirthday, t.Salary as TeacherSalary, COUNT(g.StudentID) as StudentCount from Subjects s "+
                                "INNER JOIN Teachers t on s.TeacherID = t.ID "+
                                "LEFT JOIN Grades g on g.SubjectID = s.ID "+
                                "GROUP BY s.ID, s.Name, t.Name, t.Birthday, t.Salary";
                var subjects = db.Database.SqlQuery<SubjectInfosDTO>(query).ToList();

                return Json(subjects, JsonRequestBehavior.AllowGet);
            }
        }

        // List Subject with Students
        // GET Subject/GetSubjectStudents
        [HttpGet]
        public JsonResult GetSubjectStudents(int ID)
        {
            using (var db = new MagniFinanceEntities())
            {
                var students = db.Database.SqlQuery<StudentDTO>("SELECT s.ID, s.Name, g.GradeValue from Students s INNER JOIN Grades g on (s.ID = g.StudentID) WHERE SubjectID = " + ID).ToList();

                return Json(students, JsonRequestBehavior.AllowGet);
            }
        }

        // Unenroll student from subject
        // POST Subject/UnenrollStudent
        [HttpPost]
        public JsonResult UnenrollStudent(Grade grade)
        {
            using (var db = new MagniFinanceEntities())
            {
                var gradeToRemove = db.Grades.Find(grade.StudentID, grade.SubjectID);

                if (gradeToRemove == null)
                {
                    return Json(new { success = false });
                }

                db.Grades.Remove(gradeToRemove);
                db.SaveChanges();

                return Json(gradeToRemove);
            }
        }

        // Insert a Subject
        // POST Subject/InsertSubject
        [HttpPost]
        public JsonResult InsertSubject(Subject subject)
        {
            if (subject != null)
            {
                using (var db = new MagniFinanceEntities())
                {
                    Subject newSubject = db.Subjects.Add(subject);
                    db.SaveChanges();

                    newSubject.Course = db.Courses.Find(subject.CourseID);
                    newSubject.Teacher = db.Teachers.Find(subject.TeacherID);

                    return Json(newSubject);
                }
            }
            return Json(new { success = false });
        }

        // Update a Subject
        // POST Subject/UpdateSubject
        [HttpPost]
        public JsonResult UpdateSubject(Subject subject)
        {
            using (var db = new MagniFinanceEntities())
            {
                var updatedSubject = db.Subjects.Find(subject.ID);

                if (updatedSubject == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    updatedSubject.Name = subject.Name;
                    updatedSubject.CourseID = subject.CourseID;
                    updatedSubject.TeacherID = subject.TeacherID;

                    db.SaveChanges();

                    updatedSubject.Course = db.Courses.Find(subject.CourseID);
                    updatedSubject.Teacher = db.Teachers.Find(subject.TeacherID);
                    return Json(updatedSubject);
                }
            }
        }

        // Delete a Subject
        // POST Subject/DeleteSubject
        [HttpPost]
        public JsonResult DeleteSubject(int ID)
        {
            using (var db = new MagniFinanceEntities())
            {
                var subject = db.Subjects.Find(ID);

                if (subject == null)
                {
                    return Json(new { success = false });
                }

                db.Subjects.Remove(subject);
                db.SaveChanges();

                return Json(subject);
            }
        }
    }
}