namespace YeMigbeKeeper.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public int HabeshaFoodId { get; set; }
        public HabeshaFood HabeshaFood { get; set; }
        public string TheRecipe { get; set; }
        public string HelpfulLink { get; set; }
    }
}
