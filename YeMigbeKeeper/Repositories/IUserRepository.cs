using System.Collections.Generic;
using YeMigbeKeeper.Models;

namespace YeMigbeKeeper.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetByFireBaseUserId(string fireBaseUserId);
        User GetById(int id);
        void Add(User user);
    }
}
