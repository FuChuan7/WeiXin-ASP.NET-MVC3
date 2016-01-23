using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tencent.Model
{
    /// <summary>
    /// 生成二维码后的返回结果
    /// </summary>
    public class CreateQRResult : BaseMsg
    {
        public string ticket { set; get; }
        public string expire_seconds { set; get; }
        public string url { set; get; }
    }
}
