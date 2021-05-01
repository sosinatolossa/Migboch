using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using YeMigbeKeeper.Models;
using YeMigbeKeeper.Repositories;

namespace YeMigbeKeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<User> profiles = _userRepository.GetAll();

            return Ok(profiles);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string fireBaseUserId)
        {
            return Ok(_userRepository.GetByFireBaseUserId(fireBaseUserId));
        }


        [HttpPost]
        public IActionResult Post(User user)
        {

            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FireBaseUserId },
                user);
        }
    }
}