using System;
using System.ComponentModel.DataAnnotations;

namespace YeMigbeKeeper.Models
{
    public class HabeshaFood
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public Type Type { get; set; }
        public string Picture { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public string Ingredient { get; set; }
        public int? TotalCalorie { get; set; }
        public int? TotalFat { get; set; }
        public int? Cholesterol { get; set; }
        public int? Sodium { get; set; }
        public int? TotalCarbohydrate { get; set; }
        public int? Protein { get; set; }
        public int? Calcium { get; set; }
        public int? Iron { get; set; }
        public int? Potassium { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}