using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }

        public int NameId { get; set; }
        public RoleName? Name { get; set; }
        public bool IsManagerial { get; set; }
        public DateOnly StartRole { get; set; }

        public void CopyFields(Role other)
        {
            this.Name = other.Name;
            this.IsManagerial = other.IsManagerial;
            this.StartRole = other.StartRole;
        }

        public override bool Equals(object? obj)=> obj is Role other && this.Name == other.Name &&
                this.IsManagerial == other.IsManagerial && this.StartRole.Equals(other.StartRole);

        public override int GetHashCode() => base.GetHashCode();
    }
}
