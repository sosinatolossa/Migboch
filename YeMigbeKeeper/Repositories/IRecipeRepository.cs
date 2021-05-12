using System.Collections.Generic;
using YeMigbeKeeper.Models;

namespace YeMigbeKeeper.Repositories
{
    public interface IRecipeRepository
    {
        List<Recipe> GetAllRecipes();
    }
}
