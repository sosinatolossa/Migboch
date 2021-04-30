using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Utils;

namespace YeMigbeKeeper.Repositories
{
    public class HabeshaFoodRepository : BaseRepository, IHabeshaFoodRepository
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
                            TypeId = DbUtils.GetInt(reader, "TypeId"),
                            Picture = DbUtils.GetString(reader, "Picture"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Ingredient = DbUtils.GetString(reader, "Ingredient"),
                            TotalCalorie = DbUtils.GetInt(reader, "TotalCalorie"),
                            TotalFat = DbUtils.GetInt(reader, "TotalFat"),
                            Cholesterol = DbUtils.GetInt(reader, "Cholesterol"),
                            Sodium = DbUtils.GetInt(reader, "Sodium"),
                            TotalCarbohydrate = DbUtils.GetInt(reader, "TotalCarbohydrate"),
                            Protein = DbUtils.GetInt(reader, "Protein"),
                            Calcium = DbUtils.GetInt(reader, "Calcium"),
                            Iron = DbUtils.GetInt(reader, "Iron"),
                            Potassium = DbUtils.GetInt(reader, "Potassium"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        });
                    }

                    reader.Close();

                    return habeshaFoods;
                }
            }
        }
    }
}
