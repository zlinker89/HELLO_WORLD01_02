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
    public class ResultadosByController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        [Route("~/ResultadoBy/{idperiodo}/{idempleado_seleccionado}/{idevaluado}/")]
        [HttpGet]
        public IEnumerable<ResultadosDTO> GetResultadoByEmpleado(long idperiodo, long idempleado_seleccionado, string idevaluado)
        {
            empleado e = db.empleado.Where(x => x.cedula == idevaluado).FirstOrDefault();
            var resultados = from r in db.R_Evaluacion
                            where r.id_evaluado == e.id && r.id_empleados_selecionados == idempleado_seleccionado
                            select new ResultadosDTO()
                            {
                                id = r.id,
                                id_competencia = r.id_competencia,
                                id_empleados_selecionados = r.id_empleados_selecionados,
                                id_evaluado = r.id_evaluado,
                                resultado = r.resultado
                            };
            return resultados;
        }
    }
}
