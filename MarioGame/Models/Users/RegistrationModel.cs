using System;
using System.ComponentModel.DataAnnotations;

namespace MarioGame.Models.Users
{
    public class RegistrationModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        public DateTime RegistrationDate { get; set; }
    }
}
