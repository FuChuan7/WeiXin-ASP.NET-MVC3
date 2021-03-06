define('app/views/wxuser/wxuser', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="wxuser">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <table class="table table-striped table-hover table-bordered">\r\n          <thead>\r\n            <tr>\r\n              <th>\r\n                OPENID\r\n              </th>\r\n              <th>\r\n                昵称\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class="" ms-repeat-obj="users">\r\n              <td>\r\n                {{obj.user.openid}}\r\n              </td>\r\n              <td>\r\n                {{obj.user.nickname}}\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class="clearfix">\r\n          <div class="btn-group">\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              <i class="icon-step-backward">\r\n              </i>上一页\r\n            </a>\r\n            <a class="btn green" ms-click="PreviouPage()">\r\n              {{currentPage}}/{{pageCount}}\r\n            </a>\r\n            <a class="btn green" ms-click="NextPage()">\r\n              <i class="icon-step-forward">\r\n              </i>下一页\r\n            </a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n     \r\n      <div class="pagination pagination-large">\r\n        <ul>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  \r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.wxuser = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "wxuser",
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    taskid:0,
    CurrentUser: '',
    users: [],
    pageList: 0,
    load: function () {
        ajax.wxuser.List(model.currentPage, model.limit, model.taskid).done(function (data) {
            model.users = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
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
    }

});
avalon.scan();
avalon.vmodels.page.content = "wxuser";


exports.setTaskId = function (taskid) {
    model.taskid = taskid;
    model.load();
    avalon.vmodels.page.content = "wxuser";
}


 
});