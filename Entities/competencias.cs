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
    
    public partial class competencias
    {
        public competencias()
        {
            this.preguntas_competencia = new HashSet<preguntas_competencia>();
            this.preguntas = new HashSet<preguntas>();
            this.R_Evaluacion = new HashSet<R_Evaluacion>();
        }
    
        public long id { get; set; }
        public string nombre { get; set; }
        public string rango_evaluacion { get; set; }
        public Nullable<long> idevaluacion { get; set; }
    
        public virtual evaluacion evaluacion { get; set; }
        public virtual ICollection<preguntas_competencia> preguntas_competencia { get; set; }
        public virtual ICollection<preguntas> preguntas { get; set; }
        public virtual ICollection<R_Evaluacion> R_Evaluacion { get; set; }
    }
}
