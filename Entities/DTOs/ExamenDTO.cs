using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
namespace Entities.DTOs
{
    public class ExamenDTO
    {
        public CompetenciaDTO competencia { get; set; }
        public IQueryable<PreguntaDTO> preguntas { get; set; }
    }
}
