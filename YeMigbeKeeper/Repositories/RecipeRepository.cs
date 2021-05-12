using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Utils;

namespace YeMigbeKeeper.Repositories
{
    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Recipe> GetAllRecipes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.HabeshaFoodId, r.TheRecipe, r.HelpfulLink,
		        hf.Id, hf.TypeId, hf.Picture, hf.[Name] as habeshaFoodName, hf.Rating, hf.[Description], hf.Ingredient,
                        hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                        hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,

                t.Id as TypeId, t.[Name] as TypeName

                       From Recipe r
                       Left Join HabeshaFood hf on r.HabeshaFoodId = hf.Id
                       Left Join [Type] t on hf.TypeId = t.Id";

                    var reader = cmd.ExecuteReader();
                    var recipes = new List<Recipe>();
                    while (reader.Read())
                    {
                        recipes.Add(new Recipe()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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
                                Name = DbUtils.GetString(reader, "habeshaFoodName"),
                                Rating = DbUtils.GetInt(reader, "Rating"),
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
                                UserId = DbUtils.GetInt(reader, "UserId")
                            },
                            TheRecipe = DbUtils.GetString(reader, "TheRecipe"),
                            HelpfulLink = DbUtils.GetString(reader, "HelpfulLink")
                        });
                    }
                    reader.Close();
                    return recipes;
                }
            }
        }

    }
}
