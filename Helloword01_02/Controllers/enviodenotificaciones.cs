﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
namespace Helloword01_02.Controllers
{

  
    public class prueba9999Controller : ApiController
    {
        enviodenotificacionesBLL bl = new enviodenotificacionesBLL();
        public void Get()
        {
            bl.correos();
        }

        // GET api/prueba2200/5
        public void Get(int id)
        {
            bl.correos();
        }

        // POST api/prueba2200
        public void Post([FromBody]string value)
        {
        }

        // PUT api/prueba2200/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/prueba2200/5
        public void Delete(int id)
        {
        }
    }
}
