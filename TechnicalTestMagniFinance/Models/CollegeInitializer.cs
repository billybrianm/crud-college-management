using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalTestMagniFinance.Models
{
    public class CollegeInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<MagniFinanceEntities>
    {
        protected override void Seed(MagniFinanceEntities context)
        {
            var courses = new List<Course>
            {
                new Course{Name="Biology"},
                new Course{Name="Physics"},
                new Course{Name="Chemistry"},
                new Course{Name="Medicine"},
                new Course{Name="Computer Science"}
            };

            courses.ForEach(c => context.Courses.Add(c));
            context.SaveChanges();


            var teachers = new List<Teacher>
            {
                new Teacher{Name="Justina Killam", Birthday=DateTime.Parse("30/04/1970"), Salary=35000},
                new Teacher{Name="Scottie Robert", Birthday=DateTime.Parse("02/11/1987"), Salary=35000},
                new Teacher{Name="Ellie Warner", Birthday=DateTime.Parse("10/01/1979"), Salary=45000},
                new Teacher{Name="Grace Wienfield", Birthday=DateTime.Parse("15/01/1970"), Salary=35000},
                new Teacher{Name="Stacey Merritt", Birthday=DateTime.Parse("12/07/1981"), Salary=55000},
                new Teacher{Name="Corbin Edison", Birthday=DateTime.Parse("01/09/1976"), Salary=45000},
                new Teacher{Name="Evie Clifford", Birthday=DateTime.Parse("02/06/1964"), Salary=65000},
                new Teacher{Name="Roz Penny", Birthday=DateTime.Parse("19/06/1964"), Salary=45000},
                new Teacher{Name="Cosmo Long", Birthday=DateTime.Parse("11/11/1971"), Salary=35000},
                new Teacher{Name="Galen Stoddard", Birthday=DateTime.Parse("19/04/1977"), Salary=35000},
                new Teacher{Name="Lyn Stewart", Birthday=DateTime.Parse("22/01/1981"), Salary=45000},
                new Teacher{Name="Geraldine Burke", Birthday=DateTime.Parse("29/07/1983"), Salary=35000},
                new Teacher{Name="Royston Marley", Birthday=DateTime.Parse("14/12/1987"), Salary=40000},
                new Teacher{Name="Rhemington Rhodes", Birthday=DateTime.Parse("22/11/1996"), Salary=50000},
                new Teacher{Name="Tom Chase", Birthday=DateTime.Parse("18/07/1997"), Salary=55000},
                new Teacher{Name="Christal Porche", Birthday=DateTime.Parse("18/10/1999"), Salary=25000},
                new Teacher{Name="Artie Hoggard", Birthday=DateTime.Parse("29/08/1977"), Salary=25000},
                new Teacher{Name="Mayme Lucas", Birthday=DateTime.Parse("22/11/1996"), Salary=65000},
                new Teacher{Name="Roosevelt Pitts", Birthday=DateTime.Parse("16/12/1985"), Salary=75000},
                new Teacher{Name="Gayla Bell", Birthday=DateTime.Parse("16/10/1980"), Salary=25000}
            };

            teachers.ForEach(t => context.Teachers.Add(t));
            context.SaveChanges();

            var students = new List<Student>
            {
                new Student{Name="Salim Acosta", Birthday=DateTime.Parse("23/01/1990"), Reg_number="39914"},
                new Student{Name="Annalise Connor", Birthday=DateTime.Parse("29/01/1991"), Reg_number="40438"},
                new Student{Name="Jess Kidd", Birthday=DateTime.Parse("31/03/1991"), Reg_number="73859"},
                new Student{Name="Fay Larsen", Birthday=DateTime.Parse("03/07/1991"), Reg_number="11870"},
                new Student{Name="Luther Ramsey", Birthday=DateTime.Parse("17/02/1993"), Reg_number="81218"},
                new Student{Name="Eryn Craig", Birthday=DateTime.Parse("21/04/1993"), Reg_number="49222"},
                new Student{Name="Ellen Carey", Birthday=DateTime.Parse("09/01/1994"), Reg_number="17729"},
                new Student{Name="Gabriel Irwin", Birthday=DateTime.Parse("29/01/1995"), Reg_number="76767"},
                new Student{Name="Carlo Navarro", Birthday=DateTime.Parse("13/11/1995"), Reg_number="31911"},
                new Student{Name="Sharmin Ward", Birthday=DateTime.Parse("05/02/1996"), Reg_number="47667"},
                new Student{Name="Tamia Cannon", Birthday=DateTime.Parse("15/01/1999"), Reg_number="63781"},
                new Student{Name="Nada Bender", Birthday=DateTime.Parse("18/05/1999"), Reg_number="63280"},
                new Student{Name="Rhonda Blake", Birthday=DateTime.Parse("14/06/1999"), Reg_number="35661"},
                new Student{Name="Lester Clark", Birthday=DateTime.Parse("15/11/1999"), Reg_number="86712"},
                new Student{Name="Morgan Cardenas", Birthday=DateTime.Parse("27/01/2000"), Reg_number="11225"},
                new Student{Name="Rebecca Forbes", Birthday=DateTime.Parse("17/04/2000"), Reg_number="58327"},
                new Student{Name="Serenity Nielsen", Birthday=DateTime.Parse("24/04/2000"), Reg_number="12688"},
                new Student{Name="Bevan Harvey", Birthday=DateTime.Parse("25/07/2001"), Reg_number="54858"},
                new Student{Name="Kylan Rankin", Birthday=DateTime.Parse("06/12/2001"), Reg_number="68696"},
                new Student{Name="Robbie Kent", Birthday=DateTime.Parse("08/06/2002"), Reg_number="20322"},
                new Student{Name="Agata Weston", Birthday=DateTime.Parse("18/10/2002"), Reg_number="58341"},
                new Student{Name="Abida Munoz", Birthday=DateTime.Parse("24/11/2003"), Reg_number="84465"},
                new Student{Name="Conrad Mccray", Birthday=DateTime.Parse("12/02/2004"), Reg_number="86717"},
                new Student{Name="Tayyibah Cleveland", Birthday=DateTime.Parse("24/03/2004"), Reg_number="16355"},
                new Student{Name="Dilan Thornton", Birthday=DateTime.Parse("20/07/2004"), Reg_number="80008"},
                new Student{Name="Juliette Hewitt", Birthday=DateTime.Parse("10/05/1991"), Reg_number="27963"},
                new Student{Name="Petra Holman", Birthday=DateTime.Parse("17/08/1991"), Reg_number="99872"},
                new Student{Name="Morwenna Hayes", Birthday=DateTime.Parse("07/04/1993"), Reg_number="60353"},
                new Student{Name="Hallam Barr", Birthday=DateTime.Parse("12/08/1994"), Reg_number="98020"},
                new Student{Name="Shelby Lim", Birthday=DateTime.Parse("07/04/1995"), Reg_number="84638"},
                new Student{Name="Agatha Singh", Birthday=DateTime.Parse("02/08/1995"), Reg_number="89972"},
                new Student{Name="Berat Brock", Birthday=DateTime.Parse("16/06/1996"), Reg_number="26631"},
                new Student{Name="Farhan Glenn", Birthday=DateTime.Parse("23/06/1998"), Reg_number="56566"},
                new Student{Name="Miguel Flower", Birthday=DateTime.Parse("26/05/1999"), Reg_number="47961"},
                new Student{Name="Zachariah Rodrigues", Birthday=DateTime.Parse("23/10/1999"), Reg_number="96145"},
                new Student{Name="Jamila Begum", Birthday=DateTime.Parse("14/08/2000"), Reg_number="37448"},
                new Student{Name="John-Paul Callaghan", Birthday=DateTime.Parse("22/04/2002"), Reg_number="69188"},
                new Student{Name="Tyreese Ibarra", Birthday=DateTime.Parse("21/04/2003"), Reg_number="45638"},
                new Student{Name="Rosanna Ryan", Birthday=DateTime.Parse("12/09/2003"), Reg_number="87206"},
                new Student{Name="Dahlia Atkinson", Birthday=DateTime.Parse("08/10/2004"), Reg_number="25952"}
            };

            students.ForEach(s => context.Students.Add(s));
            context.SaveChanges();

            var subjects = new List<Subject>
            {
                new Subject{Name="Anatomy", CourseID=1, TeacherID=1},
                new Subject{Name="Genetics", CourseID=1, TeacherID=2},
                new Subject{Name="Evolution", CourseID=1, TeacherID=1},
                new Subject{Name="Microbiology", CourseID=1, TeacherID=1},
                new Subject{Name="Physiology", CourseID=1, TeacherID=2},
                new Subject{Name="Electricity and Magnetism", CourseID=2, TeacherID=3},
                new Subject{Name="Foundation of Mechanics", CourseID=2, TeacherID=4},
                new Subject{Name="Astronomy and Astrophysics", CourseID=2, TeacherID=5},
                new Subject{Name="Physics of Matter", CourseID=2, TeacherID=6},
                new Subject{Name="Quantum Mechanics A", CourseID=2, TeacherID=3},
                new Subject{Name="General Chemistry", CourseID=3, TeacherID=1},
                new Subject{Name="Organic Chemistry", CourseID=3, TeacherID=7},
                new Subject{Name="Biochemistry", CourseID=3, TeacherID=8},
                new Subject{Name="Inorganic Chemistry", CourseID=3, TeacherID=10},
                new Subject{Name="Analytical Chemistry", CourseID=3, TeacherID=1},
                new Subject{Name="Pharmacology", CourseID=4, TeacherID=3},
                new Subject{Name="Psychiatry", CourseID=4, TeacherID=4},
                new Subject{Name="Pathology", CourseID=4, TeacherID=5},
                new Subject{Name="Oriented Objects", CourseID=5, TeacherID=5},
                new Subject{Name="Data Structures", CourseID=5, TeacherID=5},
            };

            subjects.ForEach(s => context.Subjects.Add(s));
            context.SaveChanges();

            var grades = new List<Grade>
            {
                
                new Grade{SubjectID=3, StudentID=34, GradeValue=6},
                new Grade{SubjectID=9, StudentID=2, GradeValue=6},
                new Grade{SubjectID=13, StudentID=21, GradeValue=4},
                new Grade{SubjectID=1, StudentID=8, GradeValue=6},
                new Grade{SubjectID=20, StudentID=7, GradeValue=10},
                new Grade{SubjectID=16, StudentID=18, GradeValue=10},
                new Grade{SubjectID=3, StudentID=9, GradeValue=10},
                new Grade{SubjectID=11, StudentID=38, GradeValue=10},
                new Grade{SubjectID=18, StudentID=10, GradeValue=1},
                new Grade{SubjectID=4, StudentID=24, GradeValue=2},
                new Grade{SubjectID=11, StudentID=3, GradeValue=3},
                new Grade{SubjectID=4, StudentID=32, GradeValue=4},
                new Grade{SubjectID=8, StudentID=14, GradeValue=9},
                new Grade{SubjectID=6, StudentID=15, GradeValue=10},
                new Grade{SubjectID=3, StudentID=19, GradeValue=9},
                new Grade{SubjectID=20, StudentID=37, GradeValue=2},
                new Grade{SubjectID=3, StudentID=6, GradeValue=9},
                new Grade{SubjectID=10, StudentID=6, GradeValue=3},
                new Grade{SubjectID=16, StudentID=28, GradeValue=3},
                new Grade{SubjectID=10, StudentID=19, GradeValue=5},
                new Grade{SubjectID=13, StudentID=25, GradeValue=6},
                new Grade{SubjectID=18, StudentID=32, GradeValue=6},
                new Grade{SubjectID=17, StudentID=31, GradeValue=2},
                new Grade{SubjectID=4, StudentID=17, GradeValue=6},
                new Grade{SubjectID=3, StudentID=13, GradeValue=1},
                new Grade{SubjectID=6, StudentID=7, GradeValue=7},
                new Grade{SubjectID=18, StudentID=27, GradeValue=8},
                new Grade{SubjectID=1, StudentID=38, GradeValue=10},
                new Grade{SubjectID=15, StudentID=21, GradeValue=5},
                new Grade{SubjectID=7, StudentID=23, GradeValue=6},
                new Grade{SubjectID=9, StudentID=11, GradeValue=3},
                new Grade{SubjectID=6, StudentID=39, GradeValue=4},
                new Grade{SubjectID=12, StudentID=29, GradeValue=4},
                new Grade{SubjectID=7, StudentID=15, GradeValue=6},
                new Grade{SubjectID=3, StudentID=21, GradeValue=8},
                new Grade{SubjectID=17, StudentID=2, GradeValue=1},
                new Grade{SubjectID=9, StudentID=18, GradeValue=3},
                new Grade{SubjectID=7, StudentID=7, GradeValue=1},
                new Grade{SubjectID=11, StudentID=4, GradeValue=2},
                new Grade{SubjectID=6, StudentID=10, GradeValue=8},
                new Grade{SubjectID=7, StudentID=26, GradeValue=1},
                new Grade{SubjectID=16, StudentID=21, GradeValue=9},
                new Grade{SubjectID=2, StudentID=3, GradeValue=3},
                new Grade{SubjectID=5, StudentID=26, GradeValue=4},
                new Grade{SubjectID=9, StudentID=20, GradeValue=7},
                new Grade{SubjectID=18, StudentID=25, GradeValue=9},
                new Grade{SubjectID=6, StudentID=22, GradeValue=5},
                new Grade{SubjectID=4, StudentID=6, GradeValue=2},
                new Grade{SubjectID=1, StudentID=12, GradeValue=5},
                new Grade{SubjectID=6, StudentID=26, GradeValue=7},
                new Grade{SubjectID=16, StudentID=9, GradeValue=5},
                new Grade{SubjectID=20, StudentID=1, GradeValue=10},
                new Grade{SubjectID=8, StudentID=12, GradeValue=2},
                new Grade{SubjectID=3, StudentID=23, GradeValue=8},
                new Grade{SubjectID=5, StudentID=4, GradeValue=7},
                new Grade{SubjectID=1, StudentID=39, GradeValue=10},
                new Grade{SubjectID=1, StudentID=3, GradeValue=7},
                new Grade{SubjectID=13, StudentID=20, GradeValue=2},
                new Grade{SubjectID=17, StudentID=21, GradeValue=4},
                new Grade{SubjectID=5, StudentID=29, GradeValue=6},
                new Grade{SubjectID=8, StudentID=32, GradeValue=3},
                new Grade{SubjectID=16, StudentID=39, GradeValue=8},
                new Grade{SubjectID=10, StudentID=15, GradeValue=10},
                new Grade{SubjectID=10, StudentID=3, GradeValue=5},
                new Grade{SubjectID=4, StudentID=36, GradeValue=4},
                new Grade{SubjectID=1, StudentID=32, GradeValue=4},
                new Grade{SubjectID=11, StudentID=31, GradeValue=9},
                new Grade{SubjectID=12, StudentID=32, GradeValue=6},
                new Grade{SubjectID=4, StudentID=1, GradeValue=7},
                new Grade{SubjectID=16, StudentID=27, GradeValue=6},
                new Grade{SubjectID=3, StudentID=31, GradeValue=6},
                new Grade{SubjectID=12, StudentID=37, GradeValue=10},
                new Grade{SubjectID=3, StudentID=32, GradeValue=3},
                new Grade{SubjectID=15, StudentID=28, GradeValue=5},
                new Grade{SubjectID=2, StudentID=13, GradeValue=1},
                new Grade{SubjectID=9, StudentID=14, GradeValue=7},
                new Grade{SubjectID=10, StudentID=11, GradeValue=2},
                new Grade{SubjectID=10, StudentID=36, GradeValue=9},
                new Grade{SubjectID=16, StudentID=17, GradeValue=6},
                new Grade{SubjectID=2, StudentID=11, GradeValue=3},
                new Grade{SubjectID=6, StudentID=31, GradeValue=5},
                new Grade{SubjectID=1, StudentID=29, GradeValue=3},
                new Grade{SubjectID=12, StudentID=16, GradeValue=10},
                new Grade{SubjectID=11, StudentID=1, GradeValue=6},
                new Grade{SubjectID=11, StudentID=33, GradeValue=4},
                new Grade{SubjectID=16, StudentID=24, GradeValue=7},
                new Grade{SubjectID=6, StudentID=11, GradeValue=2},
                new Grade{SubjectID=16, StudentID=1, GradeValue=6},
                new Grade{SubjectID=14, StudentID=7, GradeValue=6},
                new Grade{SubjectID=2, StudentID=24, GradeValue=7},
                new Grade{SubjectID=3, StudentID=25, GradeValue=7},
                new Grade{SubjectID=4, StudentID=33, GradeValue=2},
                new Grade{SubjectID=17, StudentID=11, GradeValue=1},
                new Grade{SubjectID=17, StudentID=5, GradeValue=3},
                new Grade{SubjectID=5, StudentID=23, GradeValue=2},
                new Grade{SubjectID=3, StudentID=3, GradeValue=5},
                new Grade{SubjectID=18, StudentID=21, GradeValue=10},
                new Grade{SubjectID=2, StudentID=29, GradeValue=1},
                new Grade{SubjectID=16, StudentID=38, GradeValue=7},
                new Grade{SubjectID=18, StudentID=40, GradeValue=5},
                new Grade{SubjectID=6, StudentID=14, GradeValue=2}
            };

            grades.ForEach(g => context.Grades.Add(g));
            context.SaveChanges();
        }
    }
}