using Solid.Core.Entities;
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
        public required string FirstName { get; set; }
        public required string LastName { get; set; }

        private string? identityNumber;
        public string? IdentityNumber
        {
            get => identityNumber;
            set
            {
                if (value is null || value?.Length < 8 || value?.Length > 9)
                    throw new ArgumentException("IdentityNumber");
                identityNumber = value;
            }
        }

        public GENDER Gender { get; set; }
        public DateOnly BirthDate { get; set; }
        public bool Status { get; set; }
        public DateOnly StartWorking { get; set; }
        public List<Role> Roles { get; set; } = [];
        public Team? Team { get; set; }

        public Employee()
        {
            Status = true;
        }

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
                this.CopyRoles(other.Roles);
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

        public override bool Equals(object? obj)
        {
            if (obj is not Employee)
                return false;
            var emp = (Employee)obj;
            return emp != null &&
                FirstName.Equals(emp.FirstName) &&
                LastName.Equals(emp.LastName) &&
                (IdentityNumber is null || IdentityNumber.Equals(emp.IdentityNumber)) &&
                Gender.Equals(emp.Gender) &&
                BirthDate.Equals(emp.BirthDate) &&
                Status.Equals(emp.Status) &&
                StartWorking.Equals(emp.StartWorking) &&
                Roles.SequenceEqual(emp.Roles) &&
                (Team is null || Team.Equals(Team));
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
