//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class empleados_selecionados
    {
        public empleados_selecionados()
        {
            this.R_Evaluacion = new HashSet<R_Evaluacion>();
        }
    
        public long id { get; set; }
        public Nullable<long> id_empleados { get; set; }
        public Nullable<long> id_periodos { get; set; }
        public Nullable<byte> estado { get; set; }
        public string liderado1 { get; set; }
        public string liderado2 { get; set; }
        public string liderado3 { get; set; }
        public string liderado4 { get; set; }
        public string liderado5 { get; set; }
        public string liderado6 { get; set; }
        public string liderado7 { get; set; }
        public string liderado8 { get; set; }
        public string liderado9 { get; set; }
        public string liderado10 { get; set; }
        public string par1 { get; set; }
        public string par2 { get; set; }
        public string par3 { get; set; }
        public string par4 { get; set; }
        public string par5 { get; set; }
        public string jefe { get; set; }
    
        public virtual empleado empleado { get; set; }
        public virtual periodos periodos { get; set; }
        public virtual ICollection<R_Evaluacion> R_Evaluacion { get; set; }
    }
}
