using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WxMVC.WebSite.Util
{
    public class WXConfig
    {
        /// <summary>
        /// 令牌
        /// </summary>
        public static readonly string Token = System.Configuration.ConfigurationManager.AppSettings["Token"];
        /// <summary>
        /// 应用ID
        /// </summary>
        public static String AppID = System.Configuration.ConfigurationManager.AppSettings["AppID"];
        /// <summary>
        /// 应用密钥
        /// </summary>
        public static String AppSecret = System.Configuration.ConfigurationManager.AppSettings["AppSecret"];
        /// <summary>
        /// 原始ID
        /// </summary>
        public static String weiXinOriginal = System.Configuration.ConfigurationManager.AppSettings["weiXinOriginal"];//原始id
        /// <summary>
        /// 授权回调页面域名
        /// </summary>
        public static String redirectHost = System.Configuration.ConfigurationManager.AppSettings["redirectHost"];
        /// <summary>
        /// 微信JSSDK 是否为调试模式
        /// </summary>
        public static Boolean wxJsDebug = Convert.ToBoolean( System.Configuration.ConfigurationManager.AppSettings["WxJsDebug"]);
        public static String GrantType = "client_credential";

    }
}