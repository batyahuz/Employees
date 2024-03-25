using API.Core.Entities;
using AutoMapper;
using Solid.API.Models;

namespace Solid.API.Mapping
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployeePostPutModel, Employee>().ReverseMap();
                //.ForMember(e => e.BirthDate, opt => opt.MapFrom(ePostPut => DateOnly.Parse(ePostPut.BirthDate)))
                //.ForMember(e => e.StartWorking, opt => opt.MapFrom(ePostPut => DateOnly.Parse(ePostPut.StartWorking)));

            //CreateMap<Employee, EmployeePostPutModel>()
            //    .ForMember(ePostPut => ePostPut.BirthDate, opt => opt.MapFrom(e => e.BirthDate.ToString("yyyy-MM-dd")))
            //    .ForMember(ePostPut => ePostPut.StartWorking, opt => opt.MapFrom(e => e.StartWorking.ToString("yyyy-MM-dd")));

            //CreateMap<EmployeePostPutModel, Employee>().ReverseMap();
                //.ForMember(e => e.BirthDate, opt => opt.MapFrom(ePostPut => DateOnly.Parse(ePostPut.BirthDate)))
                //.ForMember(e => e.StartWorking, opt => opt.MapFrom(ePostPut => DateOnly.Parse(ePostPut.StartWorking)));
        }
    }
}
