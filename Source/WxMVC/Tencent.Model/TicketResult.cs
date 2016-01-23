using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tencent.Model
{
    public class TicketResult:BaseMsg
    {
        public string errcode{set;get;}
        public string errmsg { set; get; }
        public string ticket { set; get; }
        public string expires_in { set; get; }
    }
}
