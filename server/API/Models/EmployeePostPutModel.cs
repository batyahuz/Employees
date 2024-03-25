using API.Core.Entities;

namespace Solid.API.Models
{
    public class EmployeePostPutModel
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
