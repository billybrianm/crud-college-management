//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TechnicalTestMagniFinance.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Subject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Nullable<int> CourseID { get; set; }
        public Nullable<int> TeacherID { get; set; }
    
        public Course Course { get; set; }
        public Teacher Teacher { get; set; }
    }
}
