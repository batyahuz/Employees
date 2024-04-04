using API.Core.Entities;
using AutoMapper;
using Solid.API.Models;
using Solid.Core.Entities;

namespace Solid.API.Mapping
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployeePostPutModel, Employee>().ReverseMap()
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles));

            CreateMap<RolePostPutModel, Role>().ReverseMap();

            CreateMap<LoginModel, Team>();
        }
    }
}
