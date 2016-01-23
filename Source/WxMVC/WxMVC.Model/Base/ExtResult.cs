using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
/* 
    ======================================================================== 
        File name：        ExtResult            
        Author：         Administrator
        Create Time：    6/30/2014 3:09:12 PM
        Modify By:        
        Modify Date:      
    ======================================================================== 
*/
namespace WxMVC.Model.Base
{
    public class ExtResult
    {
        public ExtResult()
        {
            success = false;
        }
        /// <summary>
        /// 结果是否成功
        /// </summary>
        public Boolean success { set; get; }
        /// <summary>
        /// 结果信息
        /// </summary>
        public string msg { set; get; }
        /// <summary>
        /// 是否超时
        /// </summary>
        public Boolean timeout { set; get; }
        /// <summary>
        /// 附加属性
        /// </summary>
        public Object obj { set; get; }
    }
}