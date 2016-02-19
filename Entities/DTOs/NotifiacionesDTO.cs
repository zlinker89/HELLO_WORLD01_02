using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class NotifiacionesDTO
    {
        public long idperiodo { get; set; }
        public string asunto { get; set; }
        public string mensaje { get; set; }
        public string email { get; set; }
        public string pass { get; set; }
        public string tcorreo { get; set; }
    }
}
