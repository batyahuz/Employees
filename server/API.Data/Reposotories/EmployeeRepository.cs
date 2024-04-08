using API.Core.Entities;
using API.Core.Repositories;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace Solid.Data.Reposotories
{
    public class EmployeeRepository(DataContext context) : IEmployeeRepository
    {
        private readonly DataContext _context = context;

        public async Task<IEnumerable<Employee?>?> GetEmployeesAsync(int teamId)
        {
            return await _context.Employees.Include(e => e.Team)
                .Where(e => (e.Team != null) && e.Team.Id == teamId)
                .Include(e => e.Roles).ThenInclude(r => r.Name).ToListAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id, int teamId)
        {
            var employees = await GetEmployeesAsync(teamId);
            return employees?.First(e => e?.Id == id);
        }

        public async Task<Employee?> AddEmployeeAsync(Employee employee, int teamId)
        {
            if (_context.Employees.Contains(employee))
                throw new NotSupportedException("Employee's details are already exist");

            employee.TeamId = teamId;
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee?> UpdateEmployeeAsync(int id, Employee employee, int teamId)
        {
            var existEmployee = await GetEmployeeByIdAsync(id, teamId);
            existEmployee?.CopyFields(employee);
            await _context.SaveChangesAsync();
            return existEmployee;
        }

        public async Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status, int teamId)
        {
            var existEmployee = await GetEmployeeByIdAsync(id, teamId);
            if (existEmployee is null)
                return existEmployee;
            existEmployee.Status = status;
            await _context.SaveChangesAsync();
            return existEmployee;
        }
    }
}
