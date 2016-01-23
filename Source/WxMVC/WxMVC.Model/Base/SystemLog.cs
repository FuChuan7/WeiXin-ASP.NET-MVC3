using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WxMVC.Model.Base
{
    /// <summary>
    /// 系统日志
    /// </summary>
    public class SystemLog
    {
        public SystemLog() {
            CreateTime = DateTime.Now;
        }
        public virtual int ID { set; get; }
        /// <summary>
        /// 日志类型 ERROR/DEBUG/INFO/
        /// </summary>
        public virtual string Type { set; get; }
        /// <summary>
        /// 信息
        /// </summary>
        public virtual string Message { set; get; }
        /// <summary>
        /// 堆栈信息
        /// </summary>
        public virtual string StackTrace { set; get; }
        /// <summary>
        /// 时间
        /// </summary>
        public virtual DateTime CreateTime { set; get; }
        /// <summary>
        /// 写入日志的方法
        /// </summary>
        public virtual String Method { set; get; }
        /// <summary>
        /// 写入日志的类名
        /// </summary>
        public virtual String Class { set; get; }
    }
}
