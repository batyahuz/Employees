﻿using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface ITeamService
    {
        public Task<Team?> GetTeamByNamePasswordAsync(Team team);
    }
}
