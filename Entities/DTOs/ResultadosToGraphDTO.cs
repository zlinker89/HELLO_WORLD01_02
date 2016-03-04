using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class ResultadosToGraphDTO
    {
        public string competencia { get; set; }
        public float liderados { get; set; }
        public float jefe { get; set; }
        public float pares { get; set; }
        public float autoevaluacion { get; set; }
    }
}
