using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tencent.Model;
using WxMVC.Util;


namespace Tencent.Util
{
    public class MsgFilter
    {
        /// <summary>
        /// 统一过滤
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static ErrorCode filter(string json) {
            ErrorCode errorCode = JsonHelper.parse<ErrorCode>(json);
            if (errorCode.errcode == 0) {
                return errorCode; 
            }
            errorCode.detailMsg = errorCode.getDetailMsg();
            return errorCode;
        }
    }
}
