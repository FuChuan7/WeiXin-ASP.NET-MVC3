define('app/views/product/product', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="product">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              OpenId\r\n            </th>\r\n            <th>\r\n              操作\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.openid}}\r\n            </td>\r\n          \r\n            <td style="max-width:200px;">\r\n              <a class="btn mini blue" ms-href="#!/productdetail/{{obj.ID}}">\r\n                图片列表\r\n              </a>\r\n            </td>\r\n            <!--<td style="max-width:200px;">\r\n              {{obj.FailReason}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.PrizeTotleNum}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.PrizeRestNum}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.ScanNum}}\r\n            </td>-->\r\n            \r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.product = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "product",
    dataList: {},
    title: '用户管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    CurrentObj: '',
    currentManager: {
        ID: 0,
        Account: '',
        Pwd: '',
        role: 0,
        cppoint: ''
    },
    load: function () {
        ajax.user.List(model.limit, model.currentPage).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {

    },
    PreviouPage: function () {
        if (model.currentPage == 1) {
            rootVm.$alert('提示', '已经是第一页了', 'error');
        } else {
            model.currentPage--;
            model.load();
        }
    },
    NextPage: function () {
        if (model.currentPage == model.pageCount) {
            rootVm.$alert('提示', '已经是最后一页了', 'error');
        } else {
            model.currentPage++;
            model.load();
        }
    },
    ShowDetail: function (obj) {
        model.CurrentObj = obj;
        $("#Detail_modal").modal('show');
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "product";

exports.getBooks = function () {
    model.load();
    model.$init();
    avalon.vmodels.page.content = "product";
}
 
});