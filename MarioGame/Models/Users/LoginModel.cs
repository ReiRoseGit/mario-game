using System.ComponentModel.DataAnnotations;

namespace MarioGame.Models.Users
{
    public class LoginModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
