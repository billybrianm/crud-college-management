using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TechnicalTestMagniFinance.Models;

namespace TechnicalTestMagniFinance.Controllers
{
    public class StudentController : Controller
    {
        // List ALL Students
        // GET Student/GetStudents
        [HttpGet]
        public JsonResult GetStudents()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Student> students = db.Students.ToList();

                return Json(students, JsonRequestBehavior.AllowGet);
            }
        }

        // Insert a Student
        // POST Student/InsertStudent
        [HttpPost]
        public JsonResult InsertStudent(Student student)
        {
            if (student != null)
            {
                using (var db = new MagniFinanceEntities())
                {
                    db.Students.Add(student);
                    db.SaveChanges();

                    return Json(new { success = true } );
                }
            }
                return Json(new { success = false });
        }

        // Update a Student
        // POST Student/UpdateStudent
        [HttpPost]
        public JsonResult UpdateStudent(Student student)
        {
            using (var db = new MagniFinanceEntities())
            {
                var updatedStudent = db.Students.Find(student.Id);

                if(updatedStudent == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    updatedStudent.Name = student.Name;
                    updatedStudent.Birthday = student.Birthday;
                    updatedStudent.Reg_number = student.Reg_number;

                    db.SaveChanges();
                    return Json(updatedStudent);
                }
            }
        }

        // Delete a Student
        // POST Student/DeleteStudent
        [HttpPost]
        public JsonResult DeleteStudent(int Id)
        {
            using (var db = new MagniFinanceEntities())
            {
                var student = db.Students.Find(Id);

                if(student == null)
                {
                    return Json(new { success = false });
                }

                db.Students.Remove(student);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
    }
}