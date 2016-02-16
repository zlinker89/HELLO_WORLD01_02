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
    public class CompetenciasEvaluacionController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        /*// GET api/competenciasevaluacion
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET api/competenciasevaluacion/5
        public List<CompetenciaDTO> Get(int id)
        {
            List<CompetenciaDTO> competenciaslst = new List<CompetenciaDTO>();
            List<competencias> competencias = db.competencias.Where(x => x.idevaluacion == id).ToList();
            foreach(competencias c in competencias)
            {
                competenciaslst.Add(new CompetenciaDTO()
                {
                    id = c.id,
                    idevaluacion = c.idevaluacion,
                    nombre = c.nombre,
                    rango_evaluacion = c.rango_evaluacion
                });
            }
            return competenciaslst;
        }
        /*
        // POST api/competenciasevaluacion
        public void Post([FromBody]string value)
        {
        }

        // PUT api/competenciasevaluacion/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/competenciasevaluacion/5
        public void Delete(int id)
        {
        }*/
    }
}
