define('app/views/suggest/suggest', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="suggest">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      \r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              联系方式\r\n            </th>\r\n            <th>\r\n              投诉内容\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.Phone}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.Text}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="AddOrUpdate_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd?\'新增参数\':\'修改参数\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n            <div class="alert alert-error hide">\r\n\t\t\t\t      <button class="close" data-dismiss="alert"></button>\r\n                请按照规则填写以下信息\r\n\t\t\t      </div>\r\n\t\t\t      <div class="alert alert-success hide">\r\n\t\t\t\t        <button class="close" data-dismiss="alert"></button>\r\n\t\t\t\t        信息已通过验证，正在提交...\r\n\t\t\t      </div>\r\n            <div class="row-fluid">\r\n              <div class="row-fluid">\r\n                <div class="span6 ">\r\n                  <div class="control-group">\r\n                    <label class="control-label  span3" for="Name">\r\n                      参数名:<span class="required">*</span>\r\n                    </label>\r\n                    <div class="controls  span9">\r\n                      <input type="text" name="Name" class="m-wrap span11" placholder="参数名" disabled ms-duplex="CurrentObj.Name" />\r\n                      <span class="help-block"></span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class="span6 ">\r\n                  <div class="control-group">\r\n                    <label class="control-label  span3" for="Name">\r\n                      参数值:<span class="required">*</span>\r\n                    </label>\r\n                    <div class="controls  span9">\r\n                      <input type="text" name="Name" class="m-wrap span11" placholder="请填写参数值" ms-duplex="CurrentObj.Value" />\r\n                      <span class="help-block"></span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_PageCategory_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除类别</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除类别吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.suggest = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "suggest",
    dataList: {},
    title: '投诉建议',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    Name: '',
    ID: '',
    isAdd: true,
    pid: 0,
    CurrentObj: { ID: 0, Parent: {ID:0} },
    load: function () {
        ajax.suggest.List(model.limit, model.currentPage).done(function (data) {
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
    ShowDelete: function (obj) {

        rootVm.$confirm('警告', '你确认删除吗？', function () {
            ajax.suggest.Del(obj.ID).done(function (data) {
                if (data.success) {
                    rootVm.$alert('提示', data.msg, 'success');
                    $('.confirm-dialog').modal('hide');
                    model.load();
                } else {
                    rootVm.$alert('提示', data.msg, 'error');
                }
            });
        });
    }
});
avalon.scan();
model.load();
model.$init();
avalon.vmodels.page.content = "suggest";
 
});