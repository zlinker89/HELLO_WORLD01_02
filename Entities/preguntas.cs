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
    
    public partial class preguntas
    {
        public preguntas()
        {
            this.preguntas_competencia = new HashSet<preguntas_competencia>();
        }
    
        public long id { get; set; }
        public string nombre { get; set; }
        public long idcompetencia { get; set; }
    
        public virtual ICollection<preguntas_competencia> preguntas_competencia { get; set; }
        public virtual competencias competencias { get; set; }
    }
}
