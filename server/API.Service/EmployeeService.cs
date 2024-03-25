using API.Core.Entities;
using API.Core.Repositories;
using API.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public class EmployeeService(IEmployeeRepository repository) : IEmployeeService
    {
        private readonly IEmployeeRepository _repository = repository;

        public async Task<IEnumerable<Employee>> GetEmployeesAsync(bool? status)
        {
            var employees = await _repository.GetEmployeesAsync();
            return status is null ? employees : employees.Where(c => c.Status == status);
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id, bool? status)
        {
            var employee = await _repository.GetEmployeeByIdAsync(id);
            return status is null || (employee?.Status) == status ? employee : null;
        }

        public async Task<Employee?> AddEmployeeAsync(Employee employee)
        {
            if (employee.BirthDate.CompareTo(employee.StartWorking) > 0)
                throw new ArgumentException("'BirthDate' must be after 'StartWorking'");

            foreach (var r in employee.Roles)
            {
                if (r.StartRole.CompareTo(employee.StartWorking) < 0)
                    throw new ArgumentException("'Role'.'StartRole' must be after or equal to 'StartWorking'");
            }

            return await _repository.AddEmployeeAsync(employee);
        }

        public async Task<Employee?> UpdateEmployeeAsync(int id, Employee employee) => await _repository.UpdateEmployeeAsync(id, employee);

        public async Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status) => await _repository.UpdateEmployeeStatusAsync(id, status);
    }
}
