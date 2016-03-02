using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    class R_EvaluacionDTO
    {
        public int id { get; set; }
        public string id_periodo { get; set; }
        public string id_empleados_selecionados { get; set; }
        public string id_competencia { get; set; }
        public string resultado { get; set; }
        public string id_evaluado { get; set; }
        public string tipo_evaluacion { get; set; }

    }
}
