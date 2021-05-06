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
                SELECT hf.Id, hf.TypeId, hf.Picture, hf.Name, hf.Description, hf.Ingredient,
                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,

                t.Name as TypeName,
                u.FirstName, u.LastName, u.DisplayName, u.Email, u.FireBaseUserId
                FROM HabeshaFood hf
                LEFT JOIN Type t ON t.Id = hf.TypeId
                LEFT JOIN [User] u ON u.Id = hf.UserId";

                    var reader = cmd.ExecuteReader();

                    var habeshaFoods = new List<HabeshaFood>();
                    while (reader.Read())
                    {
                        habeshaFoods.Add(new HabeshaFood()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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
                            Potassium = DbUtils.GetNullableInt(reader, "Potassium"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            }
                        });
                    }
                        

                    reader.Close();

                    return habeshaFoods;
                }
            }
        }

        public HabeshaFood GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hf.Id, hf.TypeId, hf.Picture, hf.Name, hf.Description, hf.Ingredient,
                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,

                t.Name as TypeName,
                u.FirstName, u.LastName, u.DisplayName, u.Email, u.FireBaseUserId
                FROM HabeshaFood hf
                LEFT JOIN Type t ON t.Id = hf.TypeId
                LEFT JOIN [User] u ON u.Id = hf.UserId
                          WHERE hf.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    HabeshaFood habeshaFood = null;

                    if (reader.Read())
                    {
                        habeshaFood = new HabeshaFood()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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
                            Potassium = DbUtils.GetNullableInt(reader, "Potassium"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            }
                        };
                    }
                    reader.Close();
                    return habeshaFood;
                }
            }
        }

        public void Add(HabeshaFood habeshaFood)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO HabeshaFood (TypeId, Picture, Name, Description, Ingredient, TotalCalorie, TotalFat, Cholesterol, Sodium, TotalCarbohydrate, Protein, Calcium, Iron, Potassium, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@TypeId, @Picture, @Name, @Description, @Ingredient, @TotalCalorie, @TotalFat, @Cholesterol, @Sodium, @TotalCarbohydrate, @Protein, @Calcium, @Iron, @Potassium, @UserId)";

                    DbUtils.AddParameter(cmd, "@TypeId", habeshaFood.TypeId);
                    DbUtils.AddParameter(cmd, "@Picture", habeshaFood.Picture);
                    DbUtils.AddParameter(cmd, "@Name", habeshaFood.Name);
                    DbUtils.AddParameter(cmd, "@Description", habeshaFood.Description);
                    DbUtils.AddParameter(cmd, "@Ingredient", habeshaFood.Ingredient);
                    DbUtils.AddParameter(cmd, "@TotalCalorie", habeshaFood.TotalCalorie);
                    DbUtils.AddParameter(cmd, "@TotalFat", habeshaFood.TotalFat);
                    DbUtils.AddParameter(cmd, "@Cholesterol", habeshaFood.Cholesterol);
                    DbUtils.AddParameter(cmd, "@Sodium", habeshaFood.Sodium);
                    DbUtils.AddParameter(cmd, "@TotalCarbohydrate", habeshaFood.TotalCarbohydrate);
                    DbUtils.AddParameter(cmd, "@Protein", habeshaFood.Protein);
                    DbUtils.AddParameter(cmd, "@Calcium", habeshaFood.Calcium);
                    DbUtils.AddParameter(cmd, "@Iron", habeshaFood.Iron);
                    DbUtils.AddParameter(cmd, "@Potassium", habeshaFood.Potassium);
                    DbUtils.AddParameter(cmd, "@UserId", habeshaFood.UserId);



                    habeshaFood.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(HabeshaFood habeshaFood)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE HabeshaFood
                           SET TypeId = @TypeId, 
                               Picture = @Picture,
                               Name = @Name,
                               Description = @Description,
                               Ingredient = @Ingredient,
                               TotalCalorie = @TotalCalorie, 
                               TotalFat = @TotalFat,
                               Cholesterol = @Cholesterol,
                               Sodium = @Sodium,
                               TotalCarbohydrate = @TotalCarbohydrate,
                               Protein = @Protein,
                               Calcium = @Calcium,
                               Iron = @Iron,
                               Potassium = @Potassium
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", habeshaFood.Id);
                    DbUtils.AddParameter(cmd, "@TypeId", habeshaFood.TypeId);
                    DbUtils.AddParameter(cmd, "@Picture", habeshaFood.Picture);
                    DbUtils.AddParameter(cmd, "@Name", habeshaFood.Name);
                    DbUtils.AddParameter(cmd, "@Description", habeshaFood.Description);
                    DbUtils.AddParameter(cmd, "@Ingredient", habeshaFood.Ingredient);
                    DbUtils.AddParameter(cmd, "@TotalCalorie", habeshaFood.TotalCalorie);
                    DbUtils.AddParameter(cmd, "@TotalFat", habeshaFood.TotalFat);
                    DbUtils.AddParameter(cmd, "@Cholesterol", habeshaFood.Cholesterol);
                    DbUtils.AddParameter(cmd, "@Sodium", habeshaFood.Sodium);
                    DbUtils.AddParameter(cmd, "@TotalCarbohydrate", habeshaFood.TotalCarbohydrate);
                    DbUtils.AddParameter(cmd, "@Protein", habeshaFood.Protein);
                    DbUtils.AddParameter(cmd, "@Calcium", habeshaFood.Calcium);
                    DbUtils.AddParameter(cmd, "@Iron", habeshaFood.Iron);
                    DbUtils.AddParameter(cmd, "@Potassium", habeshaFood.Potassium);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE HabeshaFood WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
