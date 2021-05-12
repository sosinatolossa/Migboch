using Microsoft.AspNetCore.Mvc;
using YeMigbeKeeper.Repositories;

namespace YeMigbeKeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recipeRepository.GetAllRecipes());
        }
    }
}
