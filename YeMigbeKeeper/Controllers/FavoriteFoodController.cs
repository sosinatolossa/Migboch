using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using YeMigbeKeeper.Repositories;

namespace YeMigbeKeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteFoodController : ControllerBase
    {
        private readonly IFavoriteFoodRepository _favoriteFoodRepository;
        private readonly IUserRepository _userRepository;

        public FavoriteFoodController(IFavoriteFoodRepository favoriteFoodRepository, IUserRepository userRepository)
        {
            _favoriteFoodRepository = favoriteFoodRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(_favoriteFoodRepository.GetAllFavoriteFoods());
        }
    }
}
