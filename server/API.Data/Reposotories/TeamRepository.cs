using API.Data;
using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Reposotories
{
    public class TeamRepository(DataContext context) : ITeamRepository
    {
        private readonly DataContext _context = context;

        public async Task<Team?> GetTeamByNamePasswordAsync(Team team)
        {
            return await _context.Teams
                .FirstOrDefaultAsync(t => t.Name == team.Name && t.Password == team.Password);
        }
    }
}
