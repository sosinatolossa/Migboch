using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Utils;
namespace YeMigbeKeeper.Repositories
{
    public class TypeRepository : BaseRepository, ITypeRepository
    {
        public TypeRepository(IConfiguration configuration) : base(configuration) { }
        public List<Type> GetAllTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Name
                  FROM Type";
                    var reader = cmd.ExecuteReader();
                    var types = new List<Type>();
                    while (reader.Read())
                    {
                        types.Add(new Type()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }
                    reader.Close();
                    return types;
                }
            }
        }
    }
}