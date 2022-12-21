using Entities;

namespace Interfaces
{
    public interface IUsersDal
    {
        User GetById(int id);
        User GetByLogin(string login);
        void PutUser(User user);
    }
}
