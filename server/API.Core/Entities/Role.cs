using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool IsManagerial { get; set; }
        public DateOnly StartRole { get; set; }
    }
}
