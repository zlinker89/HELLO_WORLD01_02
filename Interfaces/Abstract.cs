using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface Abstract<T, T2>
        where T: class
        where T2: long
    {
        void Add(T obj);
        void Update(T2 id);
        T GetById(T2 id);
        List<T> GetAll();
        T Search(Predicate<T> match);
    }
}
