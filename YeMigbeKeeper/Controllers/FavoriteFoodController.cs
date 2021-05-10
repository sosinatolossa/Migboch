using System;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Repositories;

namespace YeMigbeKeeper.Controllers
{
    [Authorize]
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

        [HttpPost]
        public IActionResult Post(FavoriteFood favoriteFood)
        {
            var currentUser = GetCurrentUser();

            favoriteFood.UserId = currentUser.Id;
            _favoriteFoodRepository.Add(favoriteFood);
            return CreatedAtAction("Get", new { id = favoriteFood.Id }, favoriteFood);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _favoriteFoodRepository.Remove(id);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseUserId(firebaseUserId);
        }
    }
}
