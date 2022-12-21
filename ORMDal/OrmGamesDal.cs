using Interfaces;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Microsoft.EntityFrameworkCore;

namespace ORMDal
{
    public class OrmGamesDal : IGameDal
    {
        public Entities.Game GetbyUserId(int UserId)
        {
            var context = new DefaultDbContext();
            try
            {
                var game = context.Game.OrderByDescending(item => item.GameDate).FirstOrDefault(item => item.UserId == UserId);
                if (game == null)
                {
                    return null;
                }
                return new Entities.Game()
                {
                    Id = game.Id,
                    Score = game.Score,
                    GameDate = game.GameDate,
                    UserId = game.UserId
                };
            }
            finally
            {
                context.Dispose();
            }
        }

        public void PutGame(Entities.Game game)
        {
            var context = new DefaultDbContext();
            try
            {
                context.Game.Add(new Game()
                {
                    Score = game.Score,
                    GameDate = game.GameDate,
                    UserId = game.UserId
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
