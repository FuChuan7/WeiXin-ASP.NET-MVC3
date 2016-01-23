using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WxMVC.Model.Business
{
    public class Role
    {
        public virtual int ID { set; get; }
        public virtual string Name { set; get; }
        public virtual string Des { set; get; }
    }
}
