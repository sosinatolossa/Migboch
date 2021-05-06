SELECT ff.Id, ff.UserId, ff.HabeshaFoodId,
	u.DisplayName,
	hf.TypeId, hf.Picture, hf.[Name], hf.[Description], hf.Ingredient,
                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,
	t.[Name] as TypeName
	FROM FavoriteFood ff
	LEFT JOIN [User] u on ff.UserId = u.Id
	LEFT JOIN HabeshaFood hf on hf.Id = ff.HabeshaFoodId
	LEFT JOIN Type t on hf.TypeId = t.Id;