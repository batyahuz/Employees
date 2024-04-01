using API.Core.Entities;
using API.Core.Repositories;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Reposotories
{
    public class EmployeeRepository(DataContext context) : IEmployeeRepository
    {
        private readonly DataContext _context = context;

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.Include(e => e.Roles).ThenInclude(r => r.Name).ToListAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            var employees = await GetEmployeesAsync();
            return employees.First(e => e.Id == id);
        }

        public async Task<Employee?> AddEmployeeAsync(Employee employee)
        {
            if(_context.Employees.Contains(employee))
            {
                throw new NotSupportedException("Employee's details are already exist");
            }
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee?> UpdateEmployeeAsync(int id, Employee employee)
        {
            var existEmployee = await GetEmployeeByIdAsync(id);
            existEmployee?.CopyFields(employee);
            await _context.SaveChangesAsync();
            return existEmployee;
        }

        public async Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status)
        {
            var existEmployee = await GetEmployeeByIdAsync(id);
            if (existEmployee is null)
                return existEmployee;
            existEmployee.Status = status;
            await _context.SaveChangesAsync();
            return existEmployee;
        }
    }
}
