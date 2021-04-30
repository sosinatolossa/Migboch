using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Utils;

namespace YeMigbeKeeper.Repositories
{
    public class HabeshaFoodRepository : BaseRepository
    {
        public HabeshaFoodRepository(IConfiguration configuration) : base(configuration) { }
        public List<HabeshaFood> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT hf.Id AS HabeshaFoodId, hf.TypeId, hf.Picture, hf.Name, hf.Description, hf.Ingredient,
                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId

                  FROM HabeshaFood hf";

                    var reader = cmd.ExecuteReader();

                    var habeshaFoods = new List<HabeshaFood>();
                    while (reader.Read())
                    {
                        habeshaFoods.Add(new HabeshaFood()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TypeId = DbUtils.GetInt(reader, "TypeId")
                            Type = new Type()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            }
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
                            },
                        });
                    }

                    reader.Close();

                    return habeshaFoods;
                }
            }
        }

    }
}
