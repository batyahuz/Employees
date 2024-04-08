using API.Core.Entities;
using AutoMapper;
using Solid.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<EmployeeDTO, Employee>().ReverseMap();
        }
    }
}
