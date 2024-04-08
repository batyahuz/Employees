using API.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee?>?> GetEmployeesAsync(int teamId);
        Task<Employee?> GetEmployeeByIdAsync(int id, int teamId);
        Task<Employee?> AddEmployeeAsync(Employee employee, int teamId);
        Task<Employee?> UpdateEmployeeAsync(int id, Employee employee, int teamId);
        Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status, int teamId);
    }
}
