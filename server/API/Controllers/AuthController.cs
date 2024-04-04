using API.Core.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Solid.API.Models;
using Solid.Core.Entities;
using Solid.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Solid.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IConfiguration configuration, ITeamService service, IMapper mapper) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly ITeamService _service = service;
        private readonly IMapper _mapper = mapper;

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel loginModel)
        {
            var team  = _mapper.Map<Team>(loginModel);
            var ExistsTeam = await _service.GetTeamByNamePasswordAsync(team);
            if (ExistsTeam is null)
                return Unauthorized();

            var claims = new List<Claim>()
            {
                new(ClaimTypes.Name, ExistsTeam.Name),
                new(ClaimTypes.PrimarySid, ExistsTeam.Id.ToString())
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(6),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }
    }
}
