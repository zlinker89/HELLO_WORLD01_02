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
        private UsuarioBLL u = new UsuarioBLL();
        public usuariosDTO LogIn(usuarios obj)
        {
            usuariosDTO uDTO = new usuariosDTO();
            try
            {
                usuarios usuario = u.Search(x => x.nombre_usuario == obj.nombre_usuario && x.password_usuario == obj.password_usuario).FirstOrDefault();
                // Si hay resultado lo paso a DTO
                if (usuario != null)
                {
                    uDTO.id = usuario.id;
                    uDTO.nombre_usuario = usuario.nombre_usuario;
                    uDTO.password_usuario = usuario.password_usuario;
                    uDTO.tipo_usuario = usuario.tipo_usuario;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return uDTO;
        }
    }
}
