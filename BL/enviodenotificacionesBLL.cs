using DAL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Net.Mail;
namespace BL

{
   public class enviodenotificacionesBLL
    {

        Drummond02Entities contex = new Drummond02Entities();

        private string merror;
        private string destino= "";
        private string Asunto = "prueba";
        private string mensaje = "pruebaa";
        private int contador = 1;
        public void correos()
        {

            
                List<empleado> nombre = contex.empleado.Where(t=> t.email!= null).ToList();
                MailMessage Correo = new MailMessage();
                SmtpClient protocolo = new SmtpClient();

                if (nombre !=null)
                {
                    foreach (var item in nombre)
                    {
                            destino = item.email;
                            Correo.To.Add(destino);
                            Correo.From = new MailAddress("eepertuz6@misena.edu.co", "elkin pertuz", System.Text.Encoding.UTF8);
                            Correo.Subject = Asunto;
                            Correo.SubjectEncoding = System.Text.Encoding.UTF8;
                            Correo.Body = mensaje;
                            Correo.BodyEncoding = System.Text.Encoding.UTF8;
                            Correo.IsBodyHtml = true;
                            protocolo.Credentials = new System.Net.NetworkCredential("", "");
                            protocolo.Port = 587;
                            protocolo.Host = "smtp.gmail.com";
                            protocolo.EnableSsl = true;
                            Console.Write("funciona");
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

