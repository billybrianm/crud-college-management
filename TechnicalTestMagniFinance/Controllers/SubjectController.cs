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
                List<Subject> subjects = db.Subjects.Include(sub => sub.Cours).Include(sub => sub.Teacher).ToList();
               

                return Json(subjects, JsonRequestBehavior.AllowGet);
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
                    db.Subjects.Add(subject);
                    db.SaveChanges();

                    return Json(new { success = true });
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
                    updatedSubject.Cours = subject.Cours;
                    updatedSubject.Teacher = subject.Teacher;

                    db.SaveChanges();
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

                return Json(new { success = true });
            }
        }
    }
}