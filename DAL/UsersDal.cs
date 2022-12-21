using Entities;
using Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class UsersDal : IUsersDal
    {
        private static List<User> users = new List<User>()
        {
            new User() {Login = "a", Password = "a", Name="a", CreationDate = DateTime.Now, Id=0},
        };

        // GetById - Получение пользователя по Id
        public User GetById(int id)
        {
            return users.FirstOrDefault(item => item.Id == id);
        }

        // GetByLogin - Получение пользователя по логину
        public User GetByLogin(string login)
        {
            return users.FirstOrDefault(item => item.Name == login);
        }

        // PutUser - Добавление пользователя в список
        public void PutUser(User user)
        {
            users.Add(user);
        }
    }
}
