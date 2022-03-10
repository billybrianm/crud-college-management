using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TechnicalTestMagniFinance.Models;
using System.Data.Entity;

namespace TechnicalTestMagniFinance.Controllers
{
    public class GradeController : Controller
    {
        // List ALL Grades
        // GET Grade/GetGrades
        [HttpGet]
        public JsonResult GetGrades()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Grade> grades = db.Grades.Include(sub => sub.Subject).Include(sub => sub.Student).ToList();

                return Json(grades, JsonRequestBehavior.AllowGet);
            }
        }

        // Insert a Grade
        // POST Grade/InsertGrade
        [HttpPost]
        public JsonResult InsertGrade(Grade grade)
        {
            if (grade != null)
            {
                using (var db = new MagniFinanceEntities())
                {
                    db.Grades.Add(grade);

                    Subject su = db.Subjects.Find(grade.SubjectId);
                    Student stu = db.Students.Find(grade.StudentId);

                    su.Students.Add(stu);

                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }

        // Update a Grade
        // POST Grade/UpdateGrade
        [HttpPost]
        public JsonResult UpdateGrade(Grade grade)
        {
            using (var db = new MagniFinanceEntities())
            {
                var updatedGrade = db.Grades.Find(grade.StudentId, grade.SubjectId);

                if (updatedGrade == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    updatedGrade.GradeValue = grade.GradeValue;
                    updatedGrade.StudentId = grade.StudentId;
                    updatedGrade.SubjectId = grade.SubjectId;

                    db.SaveChanges();
                    return Json(updatedGrade);
                }
            }
        }

        // Delete a Grade
        // POST Grade/DeleteGrade
        [HttpPost]
        public JsonResult DeleteGrade(int StudentId, int SubjectId)
        {
            using (var db = new MagniFinanceEntities())
            {
                var grade = db.Grades.Find(StudentId, SubjectId);

                if (grade == null)
                {
                    return Json(new { success = false });
                }

                db.Grades.Remove(grade);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
    }
}