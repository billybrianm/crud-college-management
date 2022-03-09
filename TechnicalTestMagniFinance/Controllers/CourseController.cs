using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TechnicalTestMagniFinance.Models;

namespace TechnicalTestMagniFinance.Controllers
{
    public class CourseController : Controller
    {
        // List ALL Courses
        // GET Course/GetCourses
        [HttpGet]
        public JsonResult GetCourses()
        {
            using (var db = new MagniFinanceEntities())
            {
                List<Course> courses = db.Courses.ToList();

                return Json(courses, JsonRequestBehavior.AllowGet);
            }
        }

        // Insert a Course
        // POST Course/InsertCourse
        [HttpPost]
        public JsonResult InsertCourse(Course course)
        {
            if (course != null)
            {
                using (var db = new MagniFinanceEntities())
                {
                    db.Courses.Add(course);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }

        // Update a Course
        // POST Course/UpdateCourse
        [HttpPost]
        public JsonResult UpdateCourse(Course course)
        {
            using (var db = new MagniFinanceEntities())
            {
                var updatedCourse = db.Courses.Find(course.Id);

                if (updatedCourse == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    updatedCourse.Name = course.Name;

                    db.SaveChanges();
                    return Json(updatedCourse);
                }
            }
        }

        // Delete a Course
        // POST Course/DeleteCourse
        [HttpPost]
        public JsonResult DeleteCourse(int Id)
        {
            using (var db = new MagniFinanceEntities())
            {
                var course = db.Courses.Find(Id);

                if (course == null)
                {
                    return Json(new { success = false });
                }

                db.Courses.Remove(course);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
    }
}