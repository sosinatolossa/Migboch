using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Utils;

namespace YeMigbeKeeper.Repositories
{
    public class FavoriteFoodRepository : BaseRepository, IFavoriteFoodRepository
    {
        public FavoriteFoodRepository(IConfiguration configuration) : base(configuration) { }

        public List<FavoriteFood> GetFavoriteFoodByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ff.Id, ff.UserId, ff.HabeshaFoodId,
	                hf.TypeId, hf.Picture, hf.Name as habeshaFoodName, hf.[Description], hf.Ingredient,
                                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,
	                t.[Name] as TypeName,
	                u.DisplayName
	                FROM FavoriteFood ff
	                LEFT JOIN HabeshaFood hf on hf.Id = ff.HabeshaFoodId
	                LEFT JOIN Type t on hf.TypeId = t.Id
	                LEFT JOIN [User] u on hf.UserId = u.Id
                    WHERE ff.UserId = @id";

                    DbUtils.AddParameter(cmd, "@id", userId);

                    var reader = cmd.ExecuteReader();

                    var favoriteFoods = new List<FavoriteFood>();

                    while (reader.Read())
                    {
                        var favoriteFood = new FavoriteFood()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            HabeshaFoodId = DbUtils.GetInt(reader, "HabeshaFoodId"),
                            HabeshaFood = new HabeshaFood()
                            {
                                Id = DbUtils.GetInt(reader, "HabeshaFoodId"),
                                TypeId = DbUtils.GetInt(reader, "TypeId"),
                                Type = new Models.Type()
                                {
                                    Id = DbUtils.GetInt(reader, "TypeId"),
                                    Name = DbUtils.GetString(reader, "TypeName"),
                                },
                                Picture = DbUtils.GetString(reader, "Picture"),
                                Name = DbUtils.GetString(reader, "habeshaFoodName"),
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
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                },
                            }
                        };
                        favoriteFoods.Add(favoriteFood);
                    }
                    reader.Close();
                    return favoriteFoods;
                }
            }
        }

        public void Add(FavoriteFood favoriteHabeshaFood)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FavoriteFood (UserId, HabeshaFoodId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @HabeshaFoodId)";

                    
                    DbUtils.AddParameter(cmd, "@UserId", favoriteHabeshaFood.UserId);
                    DbUtils.AddParameter(cmd, "@HabeshaFoodId", favoriteHabeshaFood.HabeshaFoodId);

                    favoriteHabeshaFood.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
