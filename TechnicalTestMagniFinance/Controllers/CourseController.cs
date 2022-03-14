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

        // List courses with infos
        // GET Course/GetListCourseInfos
        [HttpGet]
        public JsonResult GetListCourseInfos()
        {
            using (var db = new MagniFinanceEntities())
            {
                string query = "select c.Name, count(distinct s.ID) as SubjectCount, count(distinct t.ID) as TeacherCount, count(distinct stu.StudentID) as StudentCount, AVG(stu.GradeValue) as AverageGrades from Courses c " +
                                "LEFT JOIN Subjects s on s.CourseID = c.ID " +
                                "LEFT JOIN Teachers t on t.ID = s.TeacherID " +
                                "LEFT JOIN Grades stu on stu.SubjectID = s.ID " +
                                "GROUP BY c.Name";
                var courses = db.Database.SqlQuery<CourseInfosDTO>(query).ToList();

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
                    Course newCourse = db.Courses.Add(course);
                    db.SaveChanges();

                    return Json(newCourse);
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
                var updatedCourse = db.Courses.Find(course.ID);

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

                return Json(course);
            }
        }
    }
}