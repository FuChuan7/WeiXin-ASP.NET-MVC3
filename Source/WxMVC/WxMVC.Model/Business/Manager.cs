using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WxMVC.Model.Business
{
    /// <summary>
    /// 代表一个人员
    /// </summary>
    public class Manager
    {
        public virtual int ID { set; get; }
        /// <summary>
        /// 登录账号
        /// </summary>
        public virtual String Account { set; get; }
        /// <summary>
        /// 登录密码
        /// </summary>
        public virtual String Pwd { set; get; }
        /// <summary>
        /// 角色
        /// </summary>
        public virtual Role role { set; get; }
    }
}
