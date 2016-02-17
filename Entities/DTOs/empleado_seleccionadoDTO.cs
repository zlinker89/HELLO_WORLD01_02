using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class empleado_seleccionadoDTO
    {
        public long id { get; set; }
        public Nullable<long> id_empleados { get; set; }
        public Nullable<long> id_periodos { get; set; }
        public Nullable<byte> estado { get; set; }

    }
}
