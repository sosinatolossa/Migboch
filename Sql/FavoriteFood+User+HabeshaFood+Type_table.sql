SELECT ff.Id, ff.UserId, ff.HabeshaFoodId,
	hf.TypeId, hf.Picture, hf.[Name], hf.[Description], hf.Ingredient,
                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,
	t.[Name],
	u.DisplayName
	FROM FavoriteFood ff
	LEFT JOIN HabeshaFood hf on hf.Id = ff.HabeshaFoodId
	LEFT JOIN Type t on hf.TypeId = t.Id
	LEFT JOIN [User] u on hf.UserId = u.Id;