using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
namespace Helloword01_02.Controllers
{
    public class LogoutController : ApiController
    {
        private Logout l = new Logout();

        /*
        // GET api/logout
        public usuarioDTO Get()
        {
            
        }*/
        
        // GET api/logout/5
        public bool Get(int id)
        {
            return l.LogOut(id);
        }
        /*
        // POST api/logout
        public bool Get(int id)
        {
            return l.LogOut(id);
        }

        // PUT api/logout/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/logout/5
        public void Delete(int id)
        {
        }*/
    }
}
