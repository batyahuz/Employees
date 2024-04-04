using API.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Password { get; set; }
        public List<Employee> Employees { get; set; } = [];

        public override bool Equals(object? obj)
        {
            return obj is Team team && Name.Equals(team.Name) && Password.Equals(team.Password);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
