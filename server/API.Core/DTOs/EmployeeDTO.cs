using API.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? IdentityNumber { get; set; }
        public GENDER Gender { get; set; }
        //public string BirthDate { get; set; } = "";
        //public string StartWorking { get; set; } = "";
        public DateOnly BirthDate { get; set; }
        public DateOnly StartWorking { get; set; }
        public List<Role> Roles { get; set; } = [];
    }
}
