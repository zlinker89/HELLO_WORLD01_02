using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class empleadoDTO
    {
        public long id { get; set; }
        public string cedula { get; set; }
        public string Nombre { get; set; }
        public string tipo { get; set; }
        public string Departament { get; set; }
        public string Area { get; set; }
        public string SubArea { get; set; }
        public string CrewCd { get; set; }
        public string RosterPosition { get; set; }
        public string Unit { get; set; }
        public Nullable<long> id_user { get; set; }
    }
}
