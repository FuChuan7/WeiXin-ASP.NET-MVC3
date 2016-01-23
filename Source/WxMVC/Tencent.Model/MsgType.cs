using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tencent.Model
{
    public class MsgType
    {
        /// <summary>
        /// 事件消息
        /// </summary>
        public static string Event = "event";
        /// <summary>
        /// 文本消息
        /// </summary>
        public static string Text = "text";
        /// <summary>
        /// 图片类型
        /// </summary>
        public static string image = "image";
        /// <summary>
        /// 语音消息
        /// </summary>
        public static string voice = "voice";
        /// <summary>
        /// 视频消息
        /// </summary>
        public static string video = "video";
        /// <summary>
        /// 小视频消息
        /// </summary>
        public static string shortvideo = "shortvideo";
        /// <summary>
        /// 地理位置消息
        /// </summary>
        public static string location = "location";
        /// <summary>
        /// 链接消息
        /// </summary>
        public static string link = "link";
    }
}
