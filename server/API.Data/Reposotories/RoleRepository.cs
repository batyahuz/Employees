using API.Data;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Reposotories
{
    public class RoleRepository(DataContext context) : IRoleRepository
    {
        private readonly DataContext _context = context;

        public IEnumerable<RoleName> GetRoles() => _context.RoleNames;
    }
}
