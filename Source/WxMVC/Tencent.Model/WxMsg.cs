using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tencent.Model
{
    public class WxMsg
    {
        public virtual string ToUserName { set; get; }
        public virtual string FromUserName { set; get; }
        public virtual string CreateTime { set; get; }
        public virtual string MsgType { set; get; }
        public virtual string Event { set; get; }
        public virtual string EventKey { set; get; }
        public virtual string Ticket { set; get; }
        public virtual string Latitude { set; get; }
        public virtual string Longitude { set; get; }
        public virtual string Precision { set; get; }
        public virtual string Content { set; get; }
    }

}
