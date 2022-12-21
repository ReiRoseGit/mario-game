using System;

namespace MarioGame.Models.Game
{
    public class GameModel
    {
        public int Id { get; set; }
        public DateTime GameDate { get; set; }
        public int UserId { get; set; }
        public int Score { get; set; }
    }
}
