using Interfaces;
using Entities;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class GameDal : IGameDal
    {
        private List<Game> games = new List<Game>();

        // GetById - Получение игры по ее Id
        public Game GetById(int id)
        {
            return games.FirstOrDefault(item => item.Id == id);
        }

        // GetbyUserId - получение игры по Id игрока
        public Game GetbyUserId(int UserId)
        {
            return games.FirstOrDefault(item => item.UserId == UserId);
        }

        // PutGame - Добавление игры в список
        public void PutGame(Game game)
        {
            games.Add(game);
        }
    }
}
