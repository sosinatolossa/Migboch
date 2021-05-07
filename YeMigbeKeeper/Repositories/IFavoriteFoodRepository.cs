using System.Collections.Generic;
using YeMigbeKeeper.Models;

namespace YeMigbeKeeper.Repositories
{
    public interface IFavoriteFoodRepository
    {
        List<FavoriteFood> GetAllFavoriteFoods();
        FavoriteFood GetFavoriteFoodByUserId(int userId);
    }
}