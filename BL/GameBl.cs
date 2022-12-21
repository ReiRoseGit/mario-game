using Interfaces;
using Entities;

namespace BL
{
    public class GameBl : IGameBl
    {
        private readonly IGameDal _dal;

        public GameBl(IGameDal dal)
        {
            _dal = dal;
        }

        // GetbyUserId - Получение игры по Id игрока
        public Game GetbyUserId(int UserId)
        {
            return _dal.GetbyUserId(UserId);
        }

        // PutGame - Добавление игры
        public void PutGame(Game game)
        {
            _dal.PutGame(game);
        }
    }
}
