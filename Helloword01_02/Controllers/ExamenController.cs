using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using Entities.DTOs;
namespace Helloword01_02.Controllers
{
    public class ExamenController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        [Route("~/Examen/{idperiodo}/")]
        [HttpGet]
        public List<ExamenDTO> GetExamen(long idperiodo)
        {
            List<ExamenDTO> examenes = new List<ExamenDTO>();
            try
            {
                // consultas
                periodos periodo = db.periodos.Where(x => x.id == idperiodo && x.estado != 0).FirstOrDefault();
                evaluacion e = db.evaluacion.Where(x => x.id == periodo.id_evaluacion && x.estado != 0).FirstOrDefault();
                List<competencias> competenciaslst = db.competencias.Where(x => x.idevaluacion == e.id).ToList();

                foreach(competencias c in competenciaslst){
                    ExamenDTO examen = new ExamenDTO();
                    examen.competencia = new CompetenciaDTO();
                    
                    // añado la competencia
                    examen.competencia.id = c.id;
                    examen.competencia.idevaluacion = c.idevaluacion;
                    examen.competencia.nombre = c.nombre;
                    examen.competencia.rango_evaluacion = c.rango_evaluacion;
                    // añado preguntas
                    examen.preguntas = from p in db.preguntas
                                       where p.idcompetencia == c.id
                                       select new PreguntaDTO()
                                       {
                                           id = p.id,
                                           idcompetencia = p.idcompetencia,
                                           nombre = p.nombre,
                                       };
                    // añado a la lista de examenes
                    examenes.Add(examen);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return examenes;
        }
    }
}
