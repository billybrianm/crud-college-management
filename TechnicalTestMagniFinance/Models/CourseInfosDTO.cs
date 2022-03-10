using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalTestMagniFinance.Models
{
    public class CourseInfosDTO
    {
        public string Name { get; set; }
        public int SubjectCount { get; set; }
        public int TeacherCount { get; set; }
        public int StudentCount { get; set; }
        public Nullable<decimal> AverageGrades { get; set; }
    }
}