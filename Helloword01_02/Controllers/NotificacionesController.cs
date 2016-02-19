using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using Entities.DTOs;
using BL;
namespace Helloword01_02.Controllers
{
    public class NotificacionesController : ApiController
    {
        private enviodenotificacionesBLL en = new enviodenotificacionesBLL();

        [Route("~/Notifiaciones/")]
        [HttpPost]
        public NotifiacionesDTO SendNotificaciones(NotifiacionesDTO notificacion)
        {
            try
            {
                en.EnviarCorreos(notificacion);
            }
            catch (Exception e)
            {
                throw e;
            }
            return notificacion;
        }
    }
}
