﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class EvaluacionDTO
    {
        public long id { get; set; }
        public string nombre { get; set; }
        public string tipo_de_evaluacion { get; set; }
        public Nullable<byte> estado { get; set; }
    }
}
