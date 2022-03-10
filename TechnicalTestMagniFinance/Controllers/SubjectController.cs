﻿using System;
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
                List<Subject> subjects = db.Subjects.Include(sub => sub.Cours).Include(sub => sub.Teacher).ToList();
               

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
                string query = "select s.Id as SubjectId, s.Name as SubjectName, t.Name as TeacherName, t.Birthday as TeacherBirthday, t.Salary as TeacherSalary, COUNT(g.StudentId) as StudentCount from Subjects s "+
                                "INNER JOIN Teachers t on s.Fk_TeacherId = t.Id "+
                                "LEFT JOIN Grades g on g.SubjectId = s.Id "+
                                "GROUP BY s.Id, s.Name, t.Name, t.Birthday, t.Salary";
                var subjects = db.Database.SqlQuery<SubjectInfosDTO>(query).ToList();

                return Json(subjects, JsonRequestBehavior.AllowGet);
            }
        }

        // List Subject with Students
        // GET Subject/GetSubjectStudents
        [HttpGet]
        public JsonResult GetSubjectStudents(int Id)
        {
            using (var db = new MagniFinanceEntities())
            {
                var students = db.Database.SqlQuery<StudentDTO>("SELECT s.Id, s.Name, g.GradeValue from Students s INNER JOIN Grades g on (s.Id = g.StudentId) WHERE SubjectId = " + Id).ToList();

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
                var gradeToRemove = db.Grades.Find(grade.StudentId, grade.SubjectId);

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

                    newSubject.Cours = db.Courses.Find(subject.Fk_CourseId);
                    newSubject.Teacher = db.Teachers.Find(subject.Fk_TeacherId);

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
                var updatedSubject = db.Subjects.Find(subject.Id);

                if (updatedSubject == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    updatedSubject.Name = subject.Name;
                    updatedSubject.Fk_CourseId = subject.Fk_CourseId;
                    updatedSubject.Fk_TeacherId = subject.Fk_TeacherId;

                    db.SaveChanges();

                    updatedSubject.Cours = db.Courses.Find(subject.Fk_CourseId);
                    updatedSubject.Teacher = db.Teachers.Find(subject.Fk_TeacherId);
                    return Json(updatedSubject);
                }
            }
        }

        // Delete a Subject
        // POST Subject/DeleteSubject
        [HttpPost]
        public JsonResult DeleteSubject(int Id)
        {
            using (var db = new MagniFinanceEntities())
            {
                var subject = db.Subjects.Find(Id);

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