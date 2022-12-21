using System.Collections.Generic;
using System.Security.Claims;
using Entities;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace MarioGame.Models.Users
{
	public class CustomUserIdentity : ClaimsIdentity
    {
		public int Id { get; set; }

		public CustomUserIdentity(User user, string authenticationType = CookieAuthenticationDefaults.AuthenticationScheme) : base(GetUserClaims(user), authenticationType)
        {
            Id = user.Id;
        }

		private static List<Claim> GetUserClaims(User user)
		{
			var result = new List<Claim>
			{
				new Claim(ClaimTypes.Name, user.Login),
				new Claim(ClaimTypes.Role, "Admin"),
			};
			
			return result;
		}
	}
}
