﻿using System.ComponentModel.DataAnnotations;

namespace YeMigbeKeeper.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FireBaseUserId { get; set; }
    }
}
