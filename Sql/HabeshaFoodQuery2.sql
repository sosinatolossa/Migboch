SELECT hf.Id, hf.TypeId, hf.Picture, hf.Name, hf.Description, hf.Ingredient,
                hf.TotalCalorie, hf.TotalFat, hf.Cholesterol, hf.Sodium, hf.TotalCarbohydrate,
                hf.Protein, hf.Calcium, hf.Iron, hf.Potassium, hf.UserId,

                t.Name,
                u.FirstName, u.LastName, u.DisplayName, u.Email, u.FireBaseUserId
                FROM HabeshaFood hf
                LEFT JOIN Type t ON t.Id = hf.TypeId
                LEFT JOIN [User] u ON u.Id = hf.UserId;
                  