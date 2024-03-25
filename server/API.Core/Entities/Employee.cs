using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public enum GENDER { male, female };
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? IdentityNumber { get; set; }
        public GENDER Gender { get; set; }
        public DateOnly BirthDate { get; set; }
        public bool Status { get; set; }
        public DateOnly StartWorking { get; set; }
        public List<Role> Roles { get; set; } = [];

        public void CopyFields(Employee other)
        {
            if (other is not null)
            {
                this.FirstName = other.FirstName;
                this.LastName = other.LastName;
                this.IdentityNumber = other.IdentityNumber;
                this.Gender = other.Gender;
                this.BirthDate = other.BirthDate;
                this.Status = other.Status;
                this.StartWorking = other.StartWorking;
                this.Roles.Clear();
                other.Roles.ForEach(r => this.Roles.Add(r));
            }
        }
    }
}
