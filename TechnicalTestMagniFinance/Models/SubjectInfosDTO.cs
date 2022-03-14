using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalTestMagniFinance.Models
{
    public class SubjectInfosDTO
    {
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
        public string TeacherName { get; set; }
        public Nullable<DateTime> TeacherBirthday { get; set; }
        public decimal TeacherSalary { get; set; }
        public Nullable<int> StudentCount { get; set; } 

    }
}