﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Interfaces;
using Entities;
using BL;
using Entities.DTOs;
namespace Helloword01_02.Controllers
{
    public class LoginController : ApiController
    {
        private LoginBLL l = new LoginBLL();
        /*
        // GET api/login
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/login/5
        public string Get(int id)
        {
            return "value";
        }*/

        // POST api/login
        public usuariosDTO Post(usuarios u)
        {
            return l.LogIn(u);
        }
        /*
        // PUT api/login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/login/5
        public void Delete(int id)
        {
        }*/
    }
}
