using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TechnicalTestMagniFinance.Models;

namespace TechnicalTestMagniFinance.Controllers
{
    public class TeacherController : Controller
    {
        // GET Teacher/GetTeachers
        [HttpGet]
        public JsonResult GetTeachers()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Teacher> teachers = db.Teachers.ToList();

                return Json(teachers, JsonRequestBehavior.AllowGet);
            }
        }

        // POST Teacher/InsertTeacher
        [HttpPost]
        public JsonResult InsertTeacher(Teacher teacher)
        {
            if (teacher != null)
            {
                using (var db = new MagniFinanceEntities())
                {
                    Teacher newTeacher = db.Teachers.Add(teacher);
                    db.SaveChanges();

                    return Json(newTeacher);
                }
            }
            return Json(new { success = false });
        }

        // Update a Teacher
        // POST Teacher/UpdateTeacher
        [HttpPost]
        public JsonResult UpdateTeacher(Teacher teacher)
        {
            using (var db = new MagniFinanceEntities())
            {
                var updatedTeacher = db.Teachers.Find(teacher.ID);

                if (updatedTeacher == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    updatedTeacher.Name = teacher.Name;
                    updatedTeacher.Birthday = teacher.Birthday;
                    updatedTeacher.Salary = teacher.Salary;

                    db.SaveChanges();
                    return Json(updatedTeacher);
                }
            }
        }

        // Delete a Teacher
        // POST Teacher/DeleteTeacher
        [HttpPost]
        public JsonResult DeleteTeacher(int ID)
        {
            using (var db = new MagniFinanceEntities())
            {
                var teacher = db.Teachers.Find(ID);

                if (teacher == null)
                {
                    return Json(new { success = false });
                }

                db.Teachers.Remove(teacher);
                db.SaveChanges();

                return Json(teacher);
            }
        }
    }
}