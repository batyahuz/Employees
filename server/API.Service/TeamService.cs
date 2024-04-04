using Solid.Core.Entities;
using Solid.Core.Services;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class TeamService(ITeamRepository repository) : ITeamService
    {
        private readonly ITeamRepository _repositoy = repository;

        public async Task<Team?> GetTeamByNamePasswordAsync(Team team)
        {
            return await _repositoy.GetTeamByNamePasswordAsync(team);
        }
    }
}
