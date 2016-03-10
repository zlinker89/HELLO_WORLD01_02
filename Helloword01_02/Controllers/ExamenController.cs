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

        [Route("~/Examen/{idperiodo}/{tipo_evaluado}/")]
        [HttpGet]
        public List<ExamenDTO> GetExamen(long idperiodo, string tipo_evaluado)
        {
            List<ExamenDTO> examenes = new List<ExamenDTO>();
            try
            {
                // consultas
                periodos periodo = db.periodos.Where(x => x.id == idperiodo && x.estado != 0).FirstOrDefault();
                List<evaluacion> evaluacionlst = db.evaluacion.Where(x => x.id == periodo.id_evaluacion && x.estado != 0).ToList();
                if (evaluacionlst.Count() > 0)
                {
                    evaluacion e = evaluacionlst.FirstOrDefault();
                    // algoritmo para filtrar las competencias por rango
                    List<competencias> competenciaslst = tipo_evaluado.Equals("Jefe") ? 
                        competenciaslst = db.competencias.Where(x => x.idevaluacion == e.id).ToList() 
                        : 
                        competenciaslst = db.competencias.Where(x => x.idevaluacion == e.id && x.rango_evaluacion == tipo_evaluado).ToList();

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
                else
                {
                    examenes.Add(new ExamenDTO());
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
