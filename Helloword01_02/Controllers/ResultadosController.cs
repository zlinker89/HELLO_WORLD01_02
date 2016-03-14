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
                // solo una vez
                // obtengo el id de empleado seleccionado con el id empleado
                int id_empleado_seleccionado = (int)resultados_anterior[0].id_empleados_selecionados;
                int id_periodo = (int)resultados_anterior[0].id_periodo;
                empleados_selecionados empleado_seleccionado = db.empleados_selecionados.Where(x => x.id_empleados == id_empleado_seleccionado && x.id_periodos == id_periodo).First();
                for (int j = 0; j < resultados_anterior.Count(); j++)
                {
                    R_Evaluacion r = new R_Evaluacion();
                    

                    if (resultados_anterior[j] != null)
                    {
                        double acumulador = 0;
                        int contador = 0;
                        for (int i = 0; i < resultados_anterior.Count(); i++)
                        {
                            if (resultados_anterior[i] != null)
                            {
                                if (resultados_anterior[j].id_competencia == resultados_anterior[i].id_competencia)
                                {
                                    // sumamos y contamos
                                    contador++;
                                    acumulador += resultados_anterior[i].resultado.Value;
                                    if (i != j)
                                    {
                                        resultados_anterior[i] = null; // lo retiramos para que en la proxima pasada ya no exista
                                    }
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
                        r.id_empleados_selecionados = empleado_seleccionado.id;
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


        [Route("~/ResultadosToGraph/{idempleado}/{idperiodo}/")]
        [HttpGet]
        public List<ResultadosToGraphDTO> GetResultadosToGraph(long idempleado, long idperiodo)
        {
            List<ResultadosToGraphDTO> resultados = new List<ResultadosToGraphDTO>();
            // obtengo los resultados de evaluaciones por periodo
            List<R_Evaluacion> resultado_evaluacionlst = db.R_Evaluacion.Where(X => X.id_evaluado == idempleado && X.id_periodo == idperiodo).ToList();
            // obtengo los promedios para jefe,liderados,pares y autoevaluacion
            for (int j = 0; j < resultado_evaluacionlst.Count(); j++)
            {
                ResultadosToGraphDTO r = new ResultadosToGraphDTO();
                if (resultado_evaluacionlst[j] != null)
                {
                    int idcompetencia = (int)resultado_evaluacionlst[j].id_competencia;
                    // tomamos la competencia que vamos a promediar
                    r.competencia = db.competencias.Where(x => x.id == idcompetencia).First().nombre;
                    // para promedio
                    double LideradoSuma = 0;
                    double JefeSuma = 0;
                    double ParesSuma = 0;
                    double AutoSuma = 0;
                    double Lideradocontador = 0;
                    double Jefecontador = 0;
                    double Parescontador = 0;
                    double Autocontador = 0;

                    for (int i = 0; i < resultado_evaluacionlst.Count(); i++)
                    {
                        // obtengo promedio por competencia, sumando los datos de cada tipo_empleado
                        if (resultado_evaluacionlst[i] != null && resultado_evaluacionlst[j].id_competencia == resultado_evaluacionlst[i].id_competencia)
                        {
                            switch (resultado_evaluacionlst[i].tipo_evaluacion)
                            {
                                case "liderados":
                                    LideradoSuma += (int)resultado_evaluacionlst[i].resultado;
                                    Lideradocontador++;
                                    break;
                                case "par":
                                    ParesSuma += (int)resultado_evaluacionlst[i].resultado;
                                    Parescontador++;
                                    break;
                                case "jefe":
                                    JefeSuma += (int)resultado_evaluacionlst[i].resultado;
                                    Jefecontador++;
                                    break;
                                case "autoevaluacion":
                                    AutoSuma += (int)resultado_evaluacionlst[i].resultado;
                                    Autocontador++;
                                    break;
                            }
                            // ponesmos null para no repetir en i
                            if (i != j)
                            {
                                resultado_evaluacionlst[i] = null;
                            }
                        }
                    }
                    // Obtengo promedios y actualizo el objeto con un decimal de la forma n.x
                    if (LideradoSuma / Lideradocontador >= 0)
                    {
                        r.liderados = (float)(Math.Round((double)LideradoSuma / Lideradocontador, 2));
                    }
                    if ((float)(Math.Round((double)ParesSuma / Parescontador, 2)) >= 0)
                    {
                        r.pares = (float)(Math.Round((double)ParesSuma / Parescontador, 2));
                    }
                    if ((float)(Math.Round((double)JefeSuma / Jefecontador, 2)) >= 0)
                    {
                        r.jefe = (float)(Math.Round((double)JefeSuma / Jefecontador, 2));
                    }
                    if ((float)(Math.Round((double)AutoSuma / Autocontador, 2)) >= 0)
                    {
                        r.autoevaluacion = (float)(Math.Round((double)AutoSuma / Autocontador, 2));
                    }

                    // lo añadimos a la lista
                    resultados.Add(r);
                    // lo ponemos null
                    resultado_evaluacionlst[j] = null;
                }
            }
            return resultados;
        }
    }
}
