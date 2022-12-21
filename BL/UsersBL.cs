using Interfaces;
using Entities;

namespace BL
{
    public class UsersBL : IUsersBL
    {
        private IUsersDal _dal;

        public UsersBL(IUsersDal dal)
        {
            _dal = dal;
        }

        // GetByLogin - Получение юзера по логину
        public User GetByLogin(string login) {
            return _dal.GetByLogin(login);
        }

        // GetById - Получение юзера по Id
        public User GetById(int id)
        {
            return _dal.GetById(id);
        }

        // PutUser - Добавление юзера
        public void PutUser(User user)
        {
            _dal.PutUser(user);
        }
    }
}
