using System;
using System.Collections.Generic;
using System.Linq;
using Tencent.Model;
using Tencent.Util;
using WxMVC.Util;

namespace Tencent.Weixin
{
    public class MaterialContrller
    {
        public static MaterialContrller instance;
        public static MaterialContrller getInstance()
        {
            if (instance == null)
            {
                instance = new MaterialContrller();
            }
            return instance;
        }
        /// <summary>
        /// 获取素材列表
        /// </summary>
        /// <param name="type">素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）</param>
        /// <param name="offset">从全部素材的该偏移位置开始返回，0表示从第一个素材 返回</param>
        /// <param name="count">返回素材的数量，取值在1到20之间</param>
        public BaseMsg batchGetMaterial(String ACCESS_TOKEN,String type, int offset, int count) {

            try
            {
                String url = string.Format("https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token={0}", ACCESS_TOKEN);
                RequestSimulator Request = new RequestSimulator();
                String parm = "{\"type\":\"" + type + "\",\"offset\":\"" + offset + "\",\"count\":\"" + count + "\"}";
                //IDictionary<String, String> parm = new Dictionary<String, String>();
                //parm.Add("type", type);
                //parm.Add("offset", offset + "");
                //parm.Add("count", count + "");
                String jsonStr = Request.Post(url, parm);
                ErrorCode errorCode = MsgFilter.filter(jsonStr);
                if (errorCode.errcode != 0)
                {
                    return errorCode;
                }
                newP3 newp3 = JsonHelper.parse<newP3>(jsonStr);
                return newp3;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
