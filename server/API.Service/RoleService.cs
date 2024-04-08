using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;

namespace Solid.Service
{
    public class RoleService(IRoleRepository repository) : IRoleService
    {
        private readonly IRoleRepository _repository = repository;

        public IEnumerable<RoleName> GetRoleNames() => _repository.GetRoles();
    }
}
