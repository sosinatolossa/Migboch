using Microsoft.AspNetCore.Mvc;
using YeMigbeKeeper.Repositories;
using YeMigbeKeeper.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace YeMigbeKeeper.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HabeshaFoodController : ControllerBase
    {
        private readonly IHabeshaFoodRepository _habeshaFoodRepository;
        private readonly IUserRepository _userRepository;

        public HabeshaFoodController(IHabeshaFoodRepository habeshaFoodRepository, IUserRepository userRepository)
        {
            _habeshaFoodRepository = habeshaFoodRepository;
            _userRepository = userRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            
            return Ok(_habeshaFoodRepository.GetAll());
        }

        [HttpGet("{habeshaFoodId}")]
        public IActionResult GetHabeshaFoodById(int habeshaFoodId)
        {
            return Ok(_habeshaFoodRepository.GetById(habeshaFoodId));
        }

        [HttpPost]
        public IActionResult Post(HabeshaFood habeshaFood)
        {
            var currentUser = GetCurrentUser();

            habeshaFood.UserId = currentUser.Id;
            _habeshaFoodRepository.Add(habeshaFood);
            return CreatedAtAction("Get", new { id = habeshaFood.Id }, habeshaFood);
        }

        [HttpPut]
        public IActionResult Put(HabeshaFood habeshaFood)
        {
            _habeshaFoodRepository.Update(habeshaFood);
            return NoContent();
        }

        // Retrieves the current user object by using the provided firebaseId
        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseUserId(firebaseUserId);
        }
    }
}