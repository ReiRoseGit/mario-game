using Entities;

namespace Interfaces
{
    public interface IUsersBL
    {
        User GetById(int id);
        User GetByLogin(string login);
        void PutUser(User user);

    }
}
