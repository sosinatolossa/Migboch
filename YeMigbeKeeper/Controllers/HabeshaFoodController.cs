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
    }
}