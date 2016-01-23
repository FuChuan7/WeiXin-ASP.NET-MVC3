using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tencent.Model
{
    /// <summary>
    /// 代表图文
    /// </summary>
    public class WxArticle
    {
        public string title { set; get; }
        public string thumb_media_id { set; get; }
        public string show_cover_pic { set; get; }
        public string author { set; get; }
        public string digest { set; get; }
        public string content { set; get; }
        public string url { set; get; }
        public string content_source_url { set; get; }
    }
    /// <summary>
    /// 代表一个图文系列，最多为8篇文章那个
    /// </summary>
    public class newsP1 {
        public List<WxArticle> news_item { set; get; }
    }
    public class newP2 {
        public String media_id { set; get; }
        public newsP1 content { set; get; }
        public String update_time { set; get; }
    }
    public class newP3 : BaseMsg
    {
        public int total_count { set; get; }
        public int item_count { set; get; }
        public List<newP2> item { set; get; }
    }

}
