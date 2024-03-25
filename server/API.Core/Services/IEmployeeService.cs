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
        Task<IEnumerable<Employee>> GetEmployeesAsync(bool? status);
        Task<Employee?> GetEmployeeByIdAsync(int id, bool? status);
        Task<Employee?> AddEmployeeAsync(Employee employee);
        Task<Employee?> UpdateEmployeeAsync(int id, Employee employee);
        Task<Employee?> UpdateEmployeeStatusAsync(int id, bool status);
    }
}
