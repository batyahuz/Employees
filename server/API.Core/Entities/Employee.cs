using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public enum GENDER { male, female };
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? Surname { get; set; }

        private string? identityNumber;
        public string? IdentityNumber
        {
            get => identityNumber;
            set
            {
                if (value?.Length < 8 || value?.Length > 9)
                    throw new ArgumentException("IdentityNumber");
                identityNumber = value;
            }
        }

        public GENDER Gender { get; set; }
        public DateOnly BirthDate { get; set; }
        public bool Status { get; set; }
        public DateOnly StartWorking { get; set; }
        public List<Role> Roles { get; set; } = [];

        public Employee()
        {
            Status = true;
        }

        public void CopyFields(Employee other)
        {
            if (other is not null)
            {
                this.FirstName = other.FirstName;
                this.Surname = other.Surname;
                this.IdentityNumber = other.IdentityNumber;
                this.Gender = other.Gender;
                this.BirthDate = other.BirthDate;
                this.Status = other.Status;
                this.StartWorking = other.StartWorking;
                this.CopyRoles(other.Roles);
                //this.Roles.RemoveAll(x => x != null);
                //other.Roles.ForEach(r => this.Roles.Add(r));
                //other.Roles.Clear();
                //this.Roles = other.Roles;
                //other.Roles.RemoveAll(x => x != null);
            }
        }

        private void CopyRoles(List<Role> roles)
        {
            List<Role> itemsToRemove = [];
            foreach (var r in this.Roles)
                if (!roles.Contains(r))
                    itemsToRemove.Add(r);

            foreach (var itemToRemove in itemsToRemove)
                this.Roles.Remove(itemToRemove);

            foreach (var r in roles)
                if (!this.Roles.Contains(r))
                {
                    var role = new Role();
                    role.CopyFields(r);
                    this.Roles.Add(role);
                }
        }
    }
}
