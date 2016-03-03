using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class ResultadosDTO
    {
        public long id { get; set; }
        public Nullable<long> id_periodo { get; set; }
        public Nullable<long> id_empleados_selecionados { get; set; }
        public Nullable<long> id_competencia { get; set; }
        public double resultado { get; set; }
        public Nullable<long> id_evaluado { get; set; }
        public string tipo_evaluacion { get; set; }

    }
}
