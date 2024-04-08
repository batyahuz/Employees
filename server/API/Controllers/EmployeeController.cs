using API.Core.Entities;
using API.Core.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Solid.API.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmployeeController(IEmployeeService service, IMapper mapper) : ControllerBase
    {
        private readonly IEmployeeService _service = service;
        private readonly IMapper _mapper = mapper;

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<IActionResult> GetAsync(bool? status, string? query)
        {
            var teamId = GetTeamId();
            var employees = await _service.GetEmployeesAsync(status, query, teamId);
            return Ok(employees?.Select(_mapper.Map<EmployeeDTO>));
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id, bool? status)
        {
            var teamId = GetTeamId();
            var employee = await _service.GetEmployeeByIdAsync(id, status, teamId);
            if (employee is null)
                return NotFound();
            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] EmployeePostPutModel employeePostPut)
        {
            var teamId = GetTeamId();
            var employee = _mapper.Map<Employee>(employeePostPut);
            try
            {
                await _service.AddEmployeeAsync(employee, teamId);
            }
            catch (ArgumentException ex)
            {
                return UnprocessableEntity("Employee has no logical dates: " + ex.Message);
            }
            catch (Exception ex)
            {
                return Content("Exception" + ex.Message);
            }
            return Created("/api/employee/" + employee.Id, _mapper.Map<EmployeeDTO>(employee));
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] EmployeePostPutModel employee)
        {
            var teamId = GetTeamId();
            try
            {
                var existEmployee = await _service.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee), teamId);
                if (existEmployee is null)
                    return NotFound();
                return Ok(_mapper.Map<EmployeeDTO>(existEmployee));
            }
            catch (Exception ex)
            {
                return Content("Exception! " + ex.Message);
            }
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var teamId = GetTeamId();
            if (await _service.UpdateEmployeeStatusAsync(id, false, teamId) is null)
                return NotFound();
            return Ok();
        }

        private int GetTeamId() =>
            int.TryParse(
                User.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.PrimarySid)?.Value,
                out int teamId) ? teamId : -1;
    }
}
