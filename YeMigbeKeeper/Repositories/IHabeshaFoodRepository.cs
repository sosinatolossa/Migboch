using System.Collections.Generic;
using YeMigbeKeeper.Models;


namespace YeMigbeKeeper.Repositories
{
    public interface IHabeshaFoodRepository
    {
        List<HabeshaFood> GetAll();
    }
}
