﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class usuariosDTO
    {
        public long id { get; set; }
        public string nombre_usuario { get; set; }
        public string password_usuario { get; set; }
        public string tipo_usuario { get; set; }

    }
}