using API.Core.Entities;
using API.Core.Repositories;
using API.Core.Service;

namespace API.Service
{
    public class EmployeeService(IEmployeeRepository repository) : IEmployeeService
    {
        private readonly IEmployeeRepository _repository = repository;

        public async Task<IEnumerable<Employee?>?> GetEmployeesAsync(bool? status, string? query, int teamId)
        {
            var employees = await _repository.GetEmployeesAsync(teamId);
            return employees?.Where(
                e => e is null || ((status is null || e.Status == status) && (query is null || e.Conteins(query))));
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id, bool? status, int teamId)
        {
            var employee = await _repository.GetEmployeeByIdAsync(id, teamId);
            return status is null || (employee?.Status) == status ? employee : null;
        }

        public async Task<Employee?> AddEmployeeAsync(Employee employee, int teamId)
        {
            if (employee.BirthDate.CompareTo(employee.StartWorking) > 0)
                throw new ArgumentException("'BirthDate' must be after 'StartWorking'");

            foreach (var r in employee.Roles)
            {
                if (r.StartRole.CompareTo(employee.StartWorking) < 0)
                    throw new ArgumentException("'Role'.'StartRole' must be after or equal to 'StartWorking'");
            }

            return await _repository.AddEmployeeAsync(employee, teamId);
        }

        public async Task<Employee?> UpdateEmployeeAsync(int id, Employee employee, int teamId)
        {
            if (employee.BirthDate.CompareTo(employee.StartWorking) > 0)
                throw new ArgumentException("'Birth-Date' must be after 'Start-Working-Date'");

            foreach (var r in employee.Roles)
            {
                if (r.StartRole.CompareTo(employee.StartWorking) < 0)
                    throw new ArgumentException("Date of start Role must be after or equal to 'Start-Working-Date'");
            }

            return await _repository.UpdateEmployeeAsync(id, employee, teamId);
        }

        public async Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status, int teamId) =>
            await _repository.UpdateEmployeeStatusAsync(id, status, teamId);
    }
}
