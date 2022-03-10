using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalTestMagniFinance.Models
{
    public class StudentGradesDTO
    {
        public string SubjectName { get; set; }
        public Nullable<decimal> GradeValue { get; set; }
    }
}