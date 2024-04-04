﻿using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface ITeamRepository
    {
        public Task<Team?> GetTeamByNamePasswordAsync(Team team);
    }
}
