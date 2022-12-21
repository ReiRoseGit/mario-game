using Interfaces;
using Entities;
using System.Linq;

namespace ORMDal
{
    public class OrmUsersDal : IUsersDal
    {
        public Entities.User GetByLogin(string login)
        {
            var context = new DefaultDbContext();
            try
            {
                var user = context.User.FirstOrDefault(item => item.Login == login);

                if (user == null)
                {
                    return null;
                }
                var entity = new Entities.User()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Password = user.Password,
                    Login = user.Login,
                    CreationDate = user.CreationDate
                };
                return entity;
            }
            finally
            {
                context.Dispose();
            }
        }

        public Entities.User GetById(int id)
        {
            var context = new DefaultDbContext();
            try {
                var user = context.User.FirstOrDefault(item => item.Id == id);

                if (user == null) {
                    return null;
                }
                var entity = new Entities.User()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Password = user.Password,
                    Login = user.Login,
                    CreationDate = user.CreationDate
                };
                return entity;
            }
            finally {
                context.Dispose();
            }

        }

        public void PutUser(Entities.User user)
        {
            var context = new DefaultDbContext();
            try
            {
                context.User.Add(new User()
                {
                    Name = user.Name,
                    Password = user.Password,
                    Login = user.Login,
                    CreationDate = user.CreationDate
                });
                context.SaveChanges();
            }
            finally
            {
                context.Dispose();
            }
        }
    }
}
