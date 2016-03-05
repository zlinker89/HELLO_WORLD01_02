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
        [Route("~/ResultadoBy/{idperiodo}/{idempleado}/{idevaluado}/{tprueba}/")]
        [HttpGet]
        public IEnumerable<ResultadosDTO> GetResultadoByEmpleado(long idperiodo, long idempleado, string idevaluado, string tprueba)
        {
            empleado e = db.empleado.Where(x => x.cedula == idevaluado).FirstOrDefault();
            // esto por la relacion es con empleado_seleccionado y no con empleado
            int id_empleado_seleccionado = (int)db.empleados_selecionados.Where(x => x.id_empleados == idempleado).FirstOrDefault().id;
            var resultados = from r in db.R_Evaluacion
                            where r.id_evaluado == e.id && r.id_empleados_selecionados == id_empleado_seleccionado && r.tipo_evaluacion == tprueba
                            select new ResultadosDTO()
                            {
                                id = r.id,
                                id_competencia = r.id_competencia,
                                id_empleados_selecionados = r.id_empleados_selecionados,
                                id_evaluado = r.id_evaluado,
                                resultado = r.resultado.Value
                            };
            return resultados;
        }

        

    }
}
