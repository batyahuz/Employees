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
            //CreateMap<Employee, EmployeeDTO>()
            //    .ForMember(eDTO => eDTO.BirthDate, opt => opt.MapFrom(e => e.BirthDate.ToString("yyyy-MM-dd")))
            //    .ForMember(eDTO => eDTO.StartWorking, opt => opt.MapFrom(e => e.StartWorking.ToString("yyyy-MM-dd")));

            CreateMap<EmployeeDTO, Employee>().ReverseMap();
               //.ForMember(e => e.BirthDate, opt => opt.MapFrom(eDTO => DateOnly.Parse(eDTO.BirthDate)))
               //.ForMember(e => e.StartWorking, opt => opt.MapFrom(eDTO => DateOnly.Parse(eDTO.StartWorking)));

            //CreateMap<Employee, EmployeeDTO>().ReverseMap();
            //.ForMember(eDTO => eDTO.BirthDate, opt => opt.MapFrom(e => e.BirthDate.ToString("yyyy-MM-dd")))
            //.ForMember(eDTO => eDTO.StartWorking, opt => opt.MapFrom(e => e.StartWorking.ToString("yyyy-MM-dd")));
        }
    }
}
