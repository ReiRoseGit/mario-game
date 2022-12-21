using Entities;

namespace Interfaces
{
    public interface IGameDal
    {
        Game GetbyUserId(int UserId);
        void PutGame(Game game);
    }
}
