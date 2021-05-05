using System.Collections.Generic;
using YeMigbeKeeper.Models;


namespace YeMigbeKeeper.Repositories
{
    public interface ITypeRepository
    {
        List<Type> GetAllTypes();
    }
}
