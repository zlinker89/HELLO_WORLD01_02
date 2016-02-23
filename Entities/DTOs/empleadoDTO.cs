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
        public string email { get; set; }
        public string liderado1 { get; set; }
        public string liderado2 { get; set; }
        public string liderado3 { get; set; }
        public string liderado4 { get; set; }
        public string liderado5 { get; set; }
        public string par1 { get; set; }
        public string par2 { get; set; }
        public string par3 { get; set; }
        public string jefe { get; set; }

    }
}
