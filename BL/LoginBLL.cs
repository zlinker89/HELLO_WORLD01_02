using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;
using Entities.DTOs;
namespace BL
{
    public class LoginBLL
    {
        private UsuarioBLL usuarioHelper = new UsuarioBLL();
        private empleadoBLL empleadoHelper = new empleadoBLL();
        public usuariosDTO LogIn(usuarios obj)
        {
            usuariosDTO uDTO = new usuariosDTO();
            try
            {
                usuarios usuario = usuarioHelper.Search(x => x.nombre_usuario == obj.nombre_usuario && x.password_usuario == obj.password_usuario).FirstOrDefault();
                // Si hay resultado lo paso a DTO
                if (usuario != null)
                {
                    uDTO.id = usuario.id;
                    uDTO.nombre_usuario = usuario.nombre_usuario;
                    uDTO.password_usuario = usuario.password_usuario;
                    uDTO.tipo_usuario = usuario.tipo_usuario;
                    // buscamos el empleado
                    empleado e = empleadoHelper.Search(x => x.id_user == usuario.id).FirstOrDefault();
                    // inicializamos el objeto
                    uDTO.empleado = new empleadoDTO();
                    uDTO.empleado.id = e.id;
                    uDTO.empleado.id_user = e.id_user;
                    uDTO.empleado.Nombre = e.Nombre;
                    uDTO.empleado.RosterPosition = e.RosterPosition;
                    uDTO.empleado.SubArea = e.SubArea;
                    uDTO.empleado.tipo = e.tipo;
                    uDTO.empleado.Area = e.Area;
                    uDTO.empleado.cedula = e.cedula;
                    uDTO.empleado.CrewCd = e.CrewCd;
                    uDTO.empleado.Departament = e.Departament;
                }
                return uDTO;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
