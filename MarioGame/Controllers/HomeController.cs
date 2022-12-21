using BL;
using Entities;
using Interfaces;
using MarioGame.Models;
using MarioGame.Models.Game;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MarioGame.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IUsersBL _userBl;
        private IGameBl _gameBl;

        public HomeController(ILogger<HomeController> logger, IUsersBL usersBl, IGameBl gameBl)
        {
            _logger = logger;
            _userBl = usersBl;
            _gameBl = gameBl;
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        public IActionResult StartGame()
        {
            Game newGame = new Game();

            GameModel gameModel = new GameModel()
            {
                Score = 0,
                GameDate = DateTime.Now,
                UserId = _userBl.GetByLogin(User.Identity.Name).Id
            };
            return View(gameModel);
        }

        [HttpPost]
        [Authorize]
        public void LoseGame(int score)
        {
            Game gameModel = new Game()
            {
                Score = score,
                GameDate = DateTime.Now,
                UserId = _userBl.GetByLogin(User.Identity.Name).Id
            };
            _gameBl.PutGame(gameModel);
            
        }

        public IActionResult LoseGame()
        {
            ViewData["Score"] = _gameBl.GetbyUserId(_userBl.GetByLogin(User.Identity.Name).Id).Score;
            return View();
        }

        [HttpPost]
        [Authorize]
        public void WinGame(int score)
        {
            Game gameModel = new Game()
            {
                Score = 7900,
                GameDate = DateTime.Now,
                UserId = _userBl.GetByLogin(User.Identity.Name).Id
            };
            _gameBl.PutGame(gameModel);
        }

        public IActionResult WinGame()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
