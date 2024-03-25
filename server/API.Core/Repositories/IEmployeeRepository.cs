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
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee?> AddEmployeeAsync(Employee employee);
        Task<Employee?> UpdateEmployeeAsync(int id, Employee employee);
        Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status);
    }
}
