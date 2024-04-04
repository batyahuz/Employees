using API.Core.Entities;
using API.Core.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Models;
using Solid.Core.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController(IEmployeeService service, IMapper mapper) : ControllerBase
    {
        private readonly IEmployeeService _service = service;
        private readonly IMapper _mapper = mapper;

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<IActionResult> GetAsync(bool? status)
        {
            var employees = await _service.GetEmployeesAsync(status);
            return Ok(employees.Select(_mapper.Map<EmployeeDTO>));
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id, bool? status)
        {
            var employee = await _service.GetEmployeeByIdAsync(id, status);
            if (employee is null)
                return NotFound();
            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] EmployeePostPutModel employeePostPut)
        {
            var employee = _mapper.Map<Employee>(employeePostPut);
            try
            {
                await _service.AddEmployeeAsync(employee);
            }
            catch (ArgumentException ex)
            {
                return UnprocessableEntity("Employee has no logical dates: " + ex);
            }
            catch (Exception ex)
            {
                return Content("Exception" + ex.ToString());
            }
            return Created("/api/employee/" + employee.Id, _mapper.Map<EmployeeDTO>(employee));
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] EmployeePostPutModel employee)
        {
            try
            {
                var existEmployee = await _service.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee));
                if (existEmployee is null)
                    return NotFound();
                return Ok(_mapper.Map<EmployeeDTO>(existEmployee));
            }
            catch (Exception ex)
            {
                return Content("Exception" + ex.ToString());
            }
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _service.UpdateEmployeeStatusAsync(id, false);
            return Ok();
        }
    }
}
