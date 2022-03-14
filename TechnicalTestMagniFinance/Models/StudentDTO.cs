using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalTestMagniFinance.Models
{
    public class StudentDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> GradeValue { get; set; }
    }
}