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
    }
}
