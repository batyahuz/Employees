using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.Core.Entities;
using Solid.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Solid.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController(IRoleService service) : ControllerBase
    {
        private readonly IRoleService _service = service;

        // GET: api/<RoleController>
        [HttpGet]
        public IEnumerable<RoleName> Get() => _service.GetRoleNames();
    }
}
