using System.Collections.Generic;
using YeMigbeKeeper.Models;

namespace YeMigbeKeeper.Repositories
{
    public interface IFavoriteFoodRepository
    {
        List<FavoriteFood> GetFavoriteFoodByUserId(int userId);
        void Add(FavoriteFood favoriteHabeshaFood);
        void Remove(int id);
    }
}