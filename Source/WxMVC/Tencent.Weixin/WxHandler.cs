using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tencent.Util;
using WxMVC.Util;
using Tencent.Weixin;

namespace Tencent.Model
{
    public class WxController
    {
        private static WxController instance;
        public static WxController getInstance()
        {
            if (instance == null)
            {
                instance = new WxController();
            }
            return instance;
        }
        /// <summary>
        /// 网页授权后获取的微信用户
        /// </summary>
        /// <param name="appid">第三方用户唯一凭证</param>
        /// <param name="secret">第三方用户唯一凭证密钥，即appsecret</param>
        /// <param name="code">微信服务器返回的code</param>
        /// <returns></returns>
        public static WxUser GetWxUser(String appid, String secret, String code)
        {
            try
            {
                BaseMsg msg = WxController.getInstance().getAccessTokenByOauth(appid, secret, code, "authorization_code");
                AccessToken accessToken = msg as AccessToken;
                msg = WxUserHandler.getInstance().getWxUserByOauth(accessToken.access_token, accessToken.openid);
                WxUser user = msg as WxUser;
                return user;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }
        /// <summary>
        /// 公众号可以使用AppID和AppSecret调用本接口来获取access_token。AppID和AppSecret可在微信公众平台官网-开发者中心页中获得（需要已经成为开发者，且帐号没有异常状态）。注意调用所有微信接口时均需使用https协议。
        /// </summary>
        /// <param name="grant_type">获取access_token填写client_credential</param>
        /// <param name="appid">第三方用户唯一凭证</param>
        /// <param name="secret">第三方用户唯一凭证密钥，即appsecret</param>
        /// <returns>正常情况下，微信会返回下述JSON数据包给公众号{"access_token":"ACCESS_TOKEN","expires_in":7200},错误时微信会返回错误码等信息，JSON数据包示例如下（该示例为AppID无效错误）:{"errcode":40013,"errmsg":"invalid appid"}</returns>
        public BaseMsg getAccessToken(string grant_type, string appid, string secret)
        {
            try
            {
                String url = string.Format("https://api.weixin.qq.com/cgi-bin/token?grant_type={0}&appid={1}&secret={2}", grant_type, appid, secret);
                RequestSimulator Request = new RequestSimulator();
                String jsonStr = Request.Get(url);
                ErrorCode errorCode = MsgFilter.filter(jsonStr);
                if (errorCode.errcode!=0) {
                    return errorCode;
                }
                AccessToken accessToken = JsonHelper.parse<AccessToken>(jsonStr);
                return accessToken;
            }
            catch (Exception ex) {
                throw ex;
            }
        }
        /// <summary>
        /// 公众号可通过下述接口来获取网页授权access_token。如果网页授权的作用域为snsapi_base，则本步骤中获取到网页授权access_token的同时，也获取到了openid，snsapi_base式的网页授权流程即到此为止
        /// </summary>
        /// <param name="appid"></param>
        /// <param name="secret"></param>
        /// <param name="code"></param>
        /// <param name="grant_type"></param>
        /// <returns></returns>
        public BaseMsg getAccessTokenByOauth(string appid, string secret, string code, string grant_type) {
            try
            {
                String url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type={3}", appid, secret, code, grant_type);
                RequestSimulator Request = new RequestSimulator();
                String jsonStr = Request.Get(url);
                ErrorCode errorCode = MsgFilter.filter(jsonStr);
                if (errorCode.errcode != 0)
                {
                    return errorCode;
                }
                AccessToken accessToken = JsonHelper.parse<AccessToken>(jsonStr);
                return accessToken;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        
        }
        
    }
}
