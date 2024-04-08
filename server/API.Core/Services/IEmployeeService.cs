using API.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Service
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee?>?> GetEmployeesAsync(bool? status, string? query, int teamId);
        Task<Employee?> GetEmployeeByIdAsync(int id, bool? status, int teamId);
        Task<Employee?> AddEmployeeAsync(Employee employee, int teamId);
        Task<Employee?> UpdateEmployeeAsync(int id, Employee employee, int teamId);
        Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status, int teamId);
    }
}
