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
    public class ResultadosController : ApiController
    {
        private Drummond02Entities db = new Drummond02Entities();
        [Route("~/Resultados/")]
        [HttpPost]
        public List<R_EvaluacionDTO> AddResultados(List<R_EvaluacionDTO> resultados_anterior)
        {
            List<R_EvaluacionDTO> resultados = new List<R_EvaluacionDTO>();
            int cuenta = 0; // indico pordonde va el vector
            // ALGORITMO PARA OBTENER RESULTADO POR COMPETENCIA
            try
            {
                for (int j = 0; j < resultados_anterior.Count();j++ )
            {
                R_Evaluacion r = new R_Evaluacion();

                if (resultados_anterior[j] != null)
                {
                    double acumulador = 0;
                    int contador = 0;
                    for (int i = 0; i < resultados_anterior.Count(); i++)
                    {
                        if (resultados_anterior[i] != null && i != j)
                        {
                            if (resultados_anterior[j].id_competencia == resultados_anterior[i].id_competencia)
                            {
                                // sumamos y contamos
                                contador++;
                                acumulador += resultados_anterior[i].resultado.Value;
                                resultados_anterior[i] = null; // lo retiramos para que en la proxima pasada ya no exista
                            }
                           
                        }
                    }
                    // pasamos los resultados
                    // de prueba
                    /*
                    resultados.Add(new R_EvaluacionDTO());
                    resultados[cuenta].id = resultados_anterior[j].id;
                    resultados[cuenta].id_competencia = resultados_anterior[j].id_competencia;
                    resultados[cuenta].id_empleados_selecionados = resultados_anterior[j].id_empleados_selecionados;
                    resultados[cuenta].id_evaluado = resultados_anterior[j].id_evaluado;
                    resultados[cuenta].id_periodo = resultados_anterior[j].id_periodo;
                    resultados[cuenta].tipo_evaluacion = resultados_anterior[j].tipo_evaluacion;
                    resultados_anterior[j] = null; // retiramos este valor de la lista
                    resultados[cuenta].resultado = acumulador / contador;
                     */
                    // FIN de prueba

                    
                    r.id_competencia = resultados_anterior[j].id_competencia;
                    r.id_empleados_selecionados = resultados_anterior[j].id_empleados_selecionados;
                    r.id_evaluado = resultados_anterior[j].id_evaluado;
                    r.id_periodo = resultados_anterior[j].id_periodo;
                    r.tipo_evaluacion = resultados_anterior[j].tipo_evaluacion;
                    resultados_anterior[j] = null; // retiramos este valor de la lista
                    r.resultado = acumulador / contador;
                    // debe devolver solo 7
                    
                    // aumento la cuenta para generar lista que notiene utilidad
                    cuenta++;
                    // guardamos
                    db.R_Evaluacion.Add(r);
                    db.SaveChanges();
                }

                
            }
            }
            catch (Exception e)
            {
                
                throw e;
            }
            // debe devolver solo 7
            return resultados;
        }
    }
}
