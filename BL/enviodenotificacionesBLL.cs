using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Net.Mail;
using Entities.DTOs;
using DAL;
using Entities;
namespace BL

{
   public class enviodenotificacionesBLL
    {

        private Drummond02Entities contex = new Drummond02Entities();

        
        public void EnviarCorreos(NotifiacionesDTO n)
        {
            string merror;
            string destino= "";
            string Asunto = n.asunto;
            string mensaje = n.mensaje;
            
            List<empleado> nombre = contex.empleado.Where(t=> t.email != null).ToList();
            List<empleados_selecionados> seleccion = contex.empleados_selecionados.Where(t => t.id_periodos == n.idperiodo).ToList();
            MailMessage Correo = new MailMessage();
            SmtpClient protocolo = new SmtpClient();

            if (nombre !=null)
            {
                foreach (var item in nombre)
                {
                    foreach (var s in seleccion)
                    {
                        if(item.id == s.id_empleados)
                        {
                            destino = item.email;
                            Correo.To.Add(destino);
                            Correo.From = new MailAddress(n.email, "Drummond", System.Text.Encoding.UTF8);
                            Correo.Subject = Asunto;
                            Correo.SubjectEncoding = System.Text.Encoding.UTF8;
                            Correo.Body = mensaje;
                            Correo.BodyEncoding = System.Text.Encoding.UTF8;
                            Correo.IsBodyHtml = true;
                            protocolo.Credentials = new System.Net.NetworkCredential(n.email, n.pass);
                            if(n.tcorreo == "hotmail.com")
                            {
                                protocolo.Host = "smtp.live.com";

                                protocolo.Port = 25;
                            }
                            else if (n.tcorreo == "gmail.com")
                            {
                                protocolo.Host = "smtp." + n.tcorreo;

                                protocolo.Port = 587;
                            }
                            else
                            {
                                protocolo.Host = "smtp.gmail.com";
                                protocolo.Port = 587;
                            }
                            
                            protocolo.EnableSsl = true;
                            try
                            {
                                protocolo.Send(Correo);
                            }
                            catch (SmtpException error)
                            {

                                merror = error.Message.ToString();
                            }
                        }
                    }
                }
            } 
        }
    }
}

