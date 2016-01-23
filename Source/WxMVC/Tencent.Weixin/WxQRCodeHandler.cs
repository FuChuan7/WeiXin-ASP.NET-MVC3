using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tencent.Model;
using Tencent.Util;
using WxMVC.Util;

namespace Tencent.Weixin
{
    public class WxQRCodeHandler
    {
        public static WxQRCodeHandler instance;
        public static WxQRCodeHandler getInstance()
        {
            if (instance == null)
            {
                instance = new WxQRCodeHandler();
            }
            return instance;
        }

        public BaseMsg create(string ACCESS_TOKEN, string parmName,string parmValue)
        {
            String postData = "{\"action_name\": \"QR_LIMIT_STR_SCENE\", \"action_info\": {\"scene\": {\"" + parmName + "\": \"" + parmValue + "\"}}}";
            String url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + ACCESS_TOKEN;
            RequestSimulator Request = new RequestSimulator();
            String jsonStr = Request.Post(url,postData);
            ErrorCode errorCode = MsgFilter.filter(jsonStr);
            if (errorCode.errcode != 0)
            {
                return errorCode;
            }
            CreateQRResult obj = JsonHelper.parse<CreateQRResult>(jsonStr);
            return obj;
        }
    }
}
