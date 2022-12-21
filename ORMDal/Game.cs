using System;

namespace ORMDal
{
    public partial class Game
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public DateTime? GameDate { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
