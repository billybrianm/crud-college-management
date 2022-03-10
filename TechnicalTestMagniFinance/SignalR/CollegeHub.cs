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
    }
}