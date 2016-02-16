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
    public class PreguntaCompetenciaController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        /*
        // GET api/preguntacompetencia
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET api/preguntacompetencia/5
        public List<PreguntaDTO> Get(int id)
        {
            List<PreguntaDTO> preguntaslst = new List<PreguntaDTO>();
            List<preguntas> preguntas = db.preguntas.Where(x => x.idcompetencia == id).ToList();
            foreach (preguntas c in preguntas)
            {
                preguntaslst.Add(new PreguntaDTO()
                {
                    id = c.id,
                    nombre = c.nombre,
                    idcompetencia = c.idcompetencia
                });
            }
            return preguntaslst;
        }
        /*
        // POST api/preguntacompetencia
        public void Post([FromBody]string value)
        {
        }

        // PUT api/preguntacompetencia/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/preguntacompetencia/5
        public void Delete(int id)
        {
        }*/
    }
}
