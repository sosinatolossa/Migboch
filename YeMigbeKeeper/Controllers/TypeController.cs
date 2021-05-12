using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using YeMigbeKeeper.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace YeMigbeKeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly ITypeRepository _typeRepository;
        public TypeController(ITypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }
        // GET: api/<TypeController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_typeRepository.GetAllTypes());
        }  
    }
}
