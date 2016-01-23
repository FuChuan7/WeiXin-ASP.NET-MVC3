using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Tencent.Model;
using Tencent.Weixin;
using WxMVC.WebSite.Util;
using Tencent.Util;
using WxMVC.DAL.Repositories;

namespace WxMVC.WebSite.Controllers
{
    public class WeiXinController : Controller
    {
        public String Index()
        {
            Log.Info("调用");
            if (Request.HttpMethod == "GET")
            {
                string echoStr = Request.QueryString["echoStr"];
                if (checkSignature())
                {
                    if (!string.IsNullOrEmpty(echoStr))
                    {
                        return echoStr;
                    }
                }
            }
            else
            {
                StreamReader stream = new StreamReader(Request.InputStream);
                string xml = stream.ReadToEnd();
                return responseMsg(xml);
            }
            return null;

        }
        public ActionResult GetWXUser(String uri = "", string code = "")
        {
            WxUser user = WxController.GetWxUser(WXConfig.AppID,WXConfig.AppSecret, code);
            user = HandlerWXUser(user.openid);
            Session.Add("CurrentWxUser", user);
            ViewBag.uri = uri;
            return View();

        }
        public ActionResult TimeOut(String redirect_uri)
        {
            String Host = System.Configuration.ConfigurationManager.AppSettings["HOST"];
            redirect_uri = Host + "/WeiXin/GetWXUser?uri=" + HttpUtility.UrlEncode(redirect_uri);
            ViewBag.redirect_uri = redirect_uri;
            ViewBag.appid = WXConfig.AppID;
            return View();
        }
        /// <summary>
        /// 验证微信签名
        /// </summary>
        /// * 将token、timestamp、nonce三个参数进行字典序排序
        /// * 将三个参数字符串拼接成一个字符串进行sha1加密
        /// * 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信。
        /// <returns></returns>
        public bool checkSignature()
        {
            string signature = Request.QueryString["signature"];
            string timestamp = Request.QueryString["timestamp"];
            string nonce = Request.QueryString["nonce"];
            string[] ArrTmp = { WXConfig.Token, timestamp, nonce };
            Array.Sort(ArrTmp);     //字典排序
            string tmpStr = string.Join("", ArrTmp);
            tmpStr = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(tmpStr, "SHA1");
            tmpStr = tmpStr.ToLower();
            if (tmpStr == signature)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public void Valid()
        {
            string echoStr = Request.QueryString["echoStr"];
            if (checkSignature())
            {
                if (!string.IsNullOrEmpty(echoStr))
                {
                    Response.Write(echoStr);
                    Response.End();
                }
            }
        }

        public ActionResult RedirectUrl(String redirect_uri)
        {
            String Host = System.Configuration.ConfigurationManager.AppSettings["HOST"];
            redirect_uri = Host + redirect_uri;
            String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
            redirect_uri = string.Format(url, WXConfig.AppID, HttpUtility.UrlEncode(redirect_uri));
            ViewBag.redirect_uri = redirect_uri;
            return View();
        }
        /// <summary>
        /// 接收信息别响应
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public string responseMsg(String xml)
        {
            try
            {
                if (xml != null && xml != "")
                {

                    WxMsg msg = MsgParser.Parse(xml);
                    Log.Info("MsgType:" + msg.MsgType + "  Event:" + msg.Event + "  FromUserName" + msg.FromUserName + "  ToUserName:" + msg.ToUserName);
                    if (msg.FromUserName == WXConfig.weiXinOriginal || msg.ToUserName == WXConfig.weiXinOriginal)
                    {
                        if (msg.MsgType == MsgType.Event)
                        {
                            //接收并处理微信事件
                            if (msg.Event == "CLICK")
                            {
                                Log.Info("点击事件被触发");

                            }
                            else if (msg.Event == EventType.subscribe)
                            {
                                HandlerWXUser(msg.FromUserName);
                                Log.Info("openid为" + msg.FromUserName + "的用户，关注了该公众号");
                                String text = "尊敬的用户，欢迎关注。";
                                return responseText(msg.FromUserName, msg.ToUserName, DateTime.Now.Ticks + "", text, "0");

                            }
                            else if (msg.Event == EventType.unsubscribe)
                            {
                                HandlerWXUser(msg.FromUserName);
                                Log.Info("openid为" + msg.FromUserName + "的用户，取消关注了该公众号");
                            }
                        }
                        else if (msg.MsgType == MsgType.Text ||
                            msg.MsgType == MsgType.image ||
                            msg.MsgType == MsgType.voice ||
                            msg.MsgType == MsgType.video ||
                            msg.MsgType == MsgType.shortvideo ||
                            msg.MsgType == MsgType.location ||
                            msg.MsgType == MsgType.link)
                        { //接收信息并转发给对应的管理人员
                            String KfAccount = null ;
                            if (msg.Content.StartsWith("1"))
                            {
                                
                                KfAccount = "001@GatherFans";
                            }
                            else if (msg.Content.StartsWith("2")) 
                            {
                                KfAccount = "002@GatherFans";
                            }
                            else if (msg.Content.StartsWith("3"))
                            {
                                KfAccount = "003@GatherFans";
                            }
                            Log.Info("消息将发给客服系统：" + KfAccount);
                            return response_customer_service(msg.FromUserName, msg.ToUserName, DateTime.Now.Ticks + "", KfAccount);
                        }

                        return "";
                    }

                }
            }
            catch (Exception ex) {
                Log.Error(ex);
            }
            return "";
        }
        /// <summary>
        /// 根据openid获取用户信息，并保存到数据库
        /// </summary>
        /// <param name="openid"></param>
        public static WxUser HandlerWXUser(String openid)
        {
            try
            {
                
                BaseMsg baseMsg = WxController.getInstance().getAccessToken(WXConfig.GrantType, WXConfig.AppID, WXConfig.AppSecret);
                if (baseMsg is AccessToken)
                {
                    AccessToken accessToken = (AccessToken)baseMsg;
                    baseMsg = WxUserHandler.getInstance().getWxUserByOpenId(openid, accessToken.access_token);
                    if (baseMsg is WxUser)
                    {
                        WxUser user = baseMsg as WxUser;
                        WxUser temUser = WXUserRepository.getInstance().getByOpenId(user.openid);
                        if (temUser != null)
                        {
                            user.ID = temUser.ID;
                            Log.Info("更新 : subscribe:" + user.subscribe);

                            WXUserRepository.getInstance().Update(user);
                        }
                        else
                        {
                            Log.Info("保存 : subscribe:" + user.subscribe);
                            user = WXUserRepository.getInstance().Save(user);
                        }
                        return user;
                    }
                    else
                    {
                        Log.Info("根据OPENID获取用户信息错误" + ((ErrorCode)baseMsg).errcode + "-" + ((ErrorCode)baseMsg).errmsg + "-" + ((ErrorCode)baseMsg).detailMsg);
                    }
                }
                else
                {
                    Log.Info("获取Access错误" + ((ErrorCode)baseMsg).errcode + "-" + ((ErrorCode)baseMsg).errmsg + "-" + ((ErrorCode)baseMsg).detailMsg);

                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);

            }
            return null;

        }
       
        /// <summary>
        /// 转化多客服系统
        /// </summary>
        /// <param name="ToUserName"></param>
        /// <param name="FromUserName"></param>
        /// <param name="CreateTime"></param>
        /// <returns></returns>
        public string response_customer_service(string ToUserName, string FromUserName, String CreateTime, String KfAccount)
        {
            string textTpl = "";
            if (KfAccount != null && KfAccount.Trim() != "")
            {
                textTpl=" <xml>" +
                             "<ToUserName><![CDATA[{0}]]></ToUserName>" +
                             "<FromUserName><![CDATA[{1}]]></FromUserName>" +
                             "<CreateTime>{2}</CreateTime>" +
                             "<MsgType><![CDATA[transfer_customer_service]]></MsgType>" +
                             "<TransInfo>" +
                                 "<KfAccount><![CDATA[{3}]]></KfAccount>" +
                             "</TransInfo>" +
                         "</xml>";
                return String.Format(textTpl, ToUserName, FromUserName, CreateTime, KfAccount);
            }
            else
            {
                textTpl = "<xml>" +
                                      "<ToUserName><![CDATA[{0}]]></ToUserName>" +
                                      "<FromUserName><![CDATA[{1}]]></FromUserName>" +
                                      "<CreateTime>{2}</CreateTime>" +
                                      "<MsgType><![CDATA[transfer_customer_service]]></MsgType>" +
                                  "</xml>";
                return String.Format(textTpl, ToUserName, FromUserName, CreateTime  );
            }
        }
        public string responseText(string ToUserName, string FromUserName, String CreateTime, String Content, String FuncFlag)
        {
            string textTpl = "<xml>" +
                    "<ToUserName><![CDATA[{0}]]></ToUserName>" +
                    "<FromUserName><![CDATA[{1}]]></FromUserName>" +
                    "<CreateTime>{2}</CreateTime>" +
                    "<MsgType><![CDATA[text]]></MsgType>" +
                    "<Content><![CDATA[{3}]]></Content>" +
                    "<FuncFlag>{4}</FuncFlag>" +
                    "</xml>";
            String text = String.Format(textTpl, ToUserName, FromUserName, CreateTime, Content, FuncFlag);
            return text;
        }



    }
}
