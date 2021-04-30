using System.Collections.Generic;
using YeMigbeKeeper.Models;


namespace YeMigbeKeeper.Repositories
{
    interface IHabeshaFoodRepository
    {
        List<HabeshaFood> GetAll();
    }
}
