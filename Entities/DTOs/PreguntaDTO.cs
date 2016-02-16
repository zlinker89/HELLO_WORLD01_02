using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class PreguntaDTO
    {
        public long id { get; set; }
        public string nombre { get; set; }
        public long idcompetencia { get; set; }
    }
}
