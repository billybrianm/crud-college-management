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

        // GET Student/GetStudents
        [HttpGet]
        public JsonResult GetStudents()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Student> students = db.Students.ToList();

                JsonResult test = Json(students);

                return Json(students, JsonRequestBehavior.AllowGet);
            }
        }

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
    }
}