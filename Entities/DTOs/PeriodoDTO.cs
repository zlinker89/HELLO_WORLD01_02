using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class PeriodoDTO
    {
        public long id { get; set; }
        public Nullable<System.DateTime> fechainicio { get; set; }
        public Nullable<System.DateTime> fechafinal { get; set; }
        public string metodologia { get; set; }
        public Nullable<long> id_evaluacion { get; set; }
        public Nullable<byte> estado { get; set; }
        public string nombre { get; set; }
    }
}
