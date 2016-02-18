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
   public class NotificacionesBLL
    {

       Drummond02Entities contex = new Drummond02Entities();
       
       private string merror;
       private string destino = "krloz_beto@hotmail.com";
       private string Asunto="prueba";
       private string mensaje="pruebaa";
       private int contador = 1;
       public void correos()
       {
           
           var result = contex.empleado.ToList();
           result.Equals(contador);
           while (contador <= result.Count) 
           {
               var nombre=result.Select(t=> t.Nombre);
               contador = contador + 500;
               MailMessage Correo = new MailMessage();
               SmtpClient protocolo = new SmtpClient();

               Correo.To.Add(destino);
               Correo.From = new MailAddress("eepertuz6@misena.edu.co", "elkin pertuz", System.Text.Encoding.UTF8);
               Correo.Subject = Asunto;
               Correo.SubjectEncoding = System.Text.Encoding.UTF8;
               Correo.Body = mensaje;
               Correo.BodyEncoding = System.Text.Encoding.UTF8;
               Correo.IsBodyHtml = true;
               protocolo.Credentials = new System.Net.NetworkCredential("eepertuz6@misena.edu.co", "kamazutra95");
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
