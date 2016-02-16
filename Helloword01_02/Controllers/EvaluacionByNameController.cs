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
    public class EvaluacionByNameController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();

        [Route("~/Evaluacion/{nombre_evaluacion}/")]
        [HttpGet]
        public EvaluacionDTO EvaluacionByName(string nombre_evaluacion)
        {
            EvaluacionDTO e = new EvaluacionDTO();
            evaluacion evaluacion = db.evaluacion.Where(x => x.nombre == nombre_evaluacion && x.estado == 1).FirstOrDefault();

            if (evaluacion != null)
            {
                e.id = evaluacion.id;
                e.nombre = evaluacion.nombre;
                e.tipo_de_evaluacion = evaluacion.tipo_de_evaluacion;
                e.estado = evaluacion.estado;
            }

            return e;
        }
        
        
       
    }
}
