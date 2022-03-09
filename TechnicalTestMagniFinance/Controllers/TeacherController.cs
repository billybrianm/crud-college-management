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
                    db.Teachers.Add(teacher);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }
    }
}