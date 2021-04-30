﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YeMigbeKeeper.Models;

namespace YeMigbeKeeper.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetById(int id);
        void Add(User user);
    }
}
