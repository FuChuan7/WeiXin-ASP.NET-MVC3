using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tencent.Model
{
    public class AccessToken : BaseMsg
    {
        public string access_token { set; get; }
        public int expires_in { set; get; }
        public string refresh_token { set; get; }
        public string openid { set; get; }
        public string scope { set; get; }
        public string unionid { set; get; }
    }
}
