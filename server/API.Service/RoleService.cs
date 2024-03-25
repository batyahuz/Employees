using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class RoleService(IRoleRepository repository) : IRoleService
    {
        private readonly IRoleRepository _repository = repository;

        public IEnumerable<RoleName> GetRoleNames() => _repository.GetRoles();
    }
}
