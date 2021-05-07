using System;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using YeMigbeKeeper.Models;
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


        [HttpGet("myFavoriteFoods")]
        public IActionResult MyPosts()
        {
            User user = GetCurrentUser();
            return Ok(_favoriteFoodRepository.GetFavoriteFoodByUserId(user.Id));
        }


        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseUserId(firebaseUserId);
        }
    }
}
