using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using TechnicalTestMagniFinance.Models;

namespace TechnicalTestMagniFinance.SignalR
{
    public class CollegeHub : Hub
    {

        // Student SignalR Functions
        public void StudentAdded(Student student)
        {
            Clients.All.studentAdded(student);
        }

        public void StudentUpdated(Student student)
        {
            Clients.All.studentUpdated(student);
        }

        public void StudentDeleted(Student student)
        {
            Clients.All.studentDeleted(student);
        }

        // Course SignalR Functions
        public void CourseAdded(Course course)
        {
            Clients.All.courseAdded(course);
        }

        public void CourseUpdated(Course course)
        {
            Clients.All.courseUpdated(course);
        }

        public void CourseDeleted(Course course)
        {
            Clients.All.courseDeleted(course);
        }

        // Subject SignalR Functions
        public void SubjectAdded(Subject subject)
        {
            Clients.All.subjectAdded(subject);
        }

        public void SubjectUpdated(Subject subject)
        {
            Clients.All.subjectUpdated(subject);
        }

        public void SubjectDeleted(Subject subject)
        {
            Clients.All.subjectDeleted(subject);
        }

        // Teacher SignalR Functions
        public void TeacherAdded(Teacher teacher)
        {
            Clients.All.teacherAdded(teacher);
        }

        public void TeacherUpdated(Teacher teacher)
        {
            Clients.All.teacherUpdated(teacher);
        }

        public void TeacherDeleted(Teacher teacher)
        {
            Clients.All.teacherDeleted(teacher);
        }
    }
}