using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Utils;

namespace YeMigbeKeeper.Repositories
{
    public class FavoriteFoodRepository : BaseRepository
    {
        public FavoriteFoodRepository(IConfiguration configuration) : base(configuration) { }

        public List<FavoriteFood> GetAllFavoriteFoods()
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT ff.Id, ff.UserId, ff.HabeshaFoodId,
	            u.DisplayName,
	            hf.TypeId, hf.Picture, hf.[Name], hf.[Description], hf.Ingredient,
                            hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                            hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,
	            t.[Name] as TypeName
	            FROM FavoriteFood ff
	            LEFT JOIN [User] u on ff.UserId = u.Id
	            LEFT JOIN HabeshaFood hf on hf.Id = ff.HabeshaFoodId
	            LEFT JOIN Type t on hf.TypeId = t.Id";

                    var reader = cmd.ExecuteReader();

                    var favoriteFoods = new List<FavoriteFood>();
                    while (reader.Read())
                    {
                        favoriteFoods.Add(new FavoriteFood()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            },
                            HabeshaFoodId = DbUtils.GetInt(reader, "HabeshaFoodId"),
                            HabeshaFood = new HabeshaFood()
                            {
                                Id = DbUtils.GetInt(reader, "HabeshaFoodId"),
                                TypeId = DbUtils.GetInt(reader, "TypeId"),
                                Type = new Type()
                                {
                                    Id = DbUtils.GetInt(reader, "TypeId"),
                                    Name = DbUtils.GetString(reader, "TypeName"),
                                },
                                Picture = DbUtils.GetString(reader, "Picture"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Ingredient = DbUtils.GetString(reader, "Ingredient"),
                                TotalCalorie = DbUtils.GetNullableInt(reader, "TotalCalorie"),
                                TotalFat = DbUtils.GetNullableInt(reader, "TotalFat"),
                                Cholesterol = DbUtils.GetNullableInt(reader, "Cholesterol"),
                                Sodium = DbUtils.GetNullableInt(reader, "Sodium"),
                                TotalCarbohydrate = DbUtils.GetNullableInt(reader, "TotalCarbohydrate"),
                                Protein = DbUtils.GetNullableInt(reader, "Protein"),
                                Calcium = DbUtils.GetNullableInt(reader, "Calcium"),
                                Iron = DbUtils.GetNullableInt(reader, "Iron"),
                            }
                     
                        });
                    }

                    reader.Close();

                    return favoriteFoods;
                }
            }
        }

    }
}
