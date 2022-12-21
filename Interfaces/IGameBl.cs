using Entities;

namespace Interfaces
{
    public interface IGameBl
    {
        Game GetbyUserId(int UserId);
        void PutGame(Game game);
    }
}
