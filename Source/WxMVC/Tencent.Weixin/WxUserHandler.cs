using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tencent.Model;
using Tencent.Util;
using WxMVC.Util;

namespace Tencent.Weixin
{
    /// <summary>
    /// 微信用户控制器
    /// </summary>
    public class WxUserHandler
    {
        private static WxUserHandler instance;
        public static WxUserHandler getInstance() {
            if (instance == null) {
                instance = new WxUserHandler();
            }
            return instance;
        }
        /// <summary>
        /// 根据OPENID获取用户信息
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="ACCESS_TOKEN"></param>
        /// <returns></returns>
        public BaseMsg getWxUserByOpenId(string openid, string ACCESS_TOKEN)
        {
            try
            {
                String url = string.Format("https://api.weixin.qq.com/cgi-bin/user/info?access_token={0}&openid={1}&lang=zh_CN", ACCESS_TOKEN, openid);
                RequestSimulator Request = new RequestSimulator();
                String jsonStr = Request.Get(url);
                ErrorCode errorCode = MsgFilter.filter(jsonStr);
                if (errorCode.errcode != 0)
                {
                    return errorCode;
                }
                WxUser obj = JsonHelper.parse<WxUser>(jsonStr);
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BaseMsg getWxUserByOauth(string access_token, string openid) {
            try
            {
                String url = string.Format("https://api.weixin.qq.com/sns/userinfo?access_token={0}&openid={1}&lang=zh_CN", access_token, openid);
                RequestSimulator Request = new RequestSimulator();
                String jsonStr = Request.Get(url);
                ErrorCode errorCode = MsgFilter.filter(jsonStr);
                if (errorCode.errcode != 0)
                {
                    return errorCode;
                }
                WxUser obj = JsonHelper.parse<WxUser>(jsonStr);
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        
        }
    }
}
