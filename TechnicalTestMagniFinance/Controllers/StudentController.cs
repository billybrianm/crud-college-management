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
        public JsonResult GetStudents()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Student> funcionarios = db.Students.ToList();

                return Json(funcionarios, JsonRequestBehavior.AllowGet);
            }
        }
    }
}