using Microsoft.AspNetCore.Mvc;
using YeMigbeKeeper.Repositories;
using YeMigbeKeeper.Models;
using Microsoft.AspNetCore.Authorization;

namespace YeMigbeKeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabeshaFoodController : ControllerBase
    {
        private readonly IHabeshaFoodRepository _habeshaFoodRepository;

        public HabeshaFoodController(IHabeshaFoodRepository habeshaFoodRepository)
        {
            _habeshaFoodRepository = habeshaFoodRepository;
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
        public IActionResult HabeshaFood(HabeshaFood habeshaFood)
        {
            //var currentUserProfile = GetCurrentUserProfile();

            //post.UserProfileId = currentUserProfile.Id;
            _habeshaFoodRepository.Add(habeshaFood);
            return CreatedAtAction("Get", new { id = habeshaFood.Id }, habeshaFood);
        }
    }
}