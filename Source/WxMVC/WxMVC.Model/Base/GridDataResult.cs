using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
/* 
    ======================================================================== 
        File name：        GridDataResult            
        Author：         Administrator
        Create Time：    6/30/2014 3:10:56 PM
        Modify By:        
        Modify Date:      
    ======================================================================== 
*/
namespace WxMVC.Model.Base
{
    public class GridDataResult<T>
    {

        public GridDataResult()
        {
            items = new List<T>();
            success = false;
            msg = "";
        }
        /// <summary>
        /// 是否成功
        /// </summary>
        public Boolean success { set; get; }
        /// <summary>
        /// 信息
        /// </summary>
        public string msg { set; get; }
        public IList<T> items { set; get; }
        public long total { set; get; }
        public long page { get; set; }
        public long limit { get; set; }
        public long totalPage { get; set; }
        /// <summary>
        /// 附件属性
        /// </summary>
        public Object obj { set; get; }
    }
}