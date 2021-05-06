using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YeMigbeKeeper.Models
{
    public class FavoriteFood
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int HabeshaFoodId { get; set; }
        public HabeshaFood HabeshaFood { get; set; }
    }
}
