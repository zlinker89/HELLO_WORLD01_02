using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class CompetenciaDTO
    {
        public long id { get; set; }
        public string nombre { get; set; }
        public string rango_evaluacion { get; set; }
        public Nullable<long> idevaluacion { get; set; }

    }
}
