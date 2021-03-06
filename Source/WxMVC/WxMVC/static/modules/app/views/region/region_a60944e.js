define('app/views/region/region', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="region">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd">\r\n            <i class="icon-plus">\r\n            </i>新增\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              名称\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.Name}}\r\n            </td>\r\n            <td>\r\n              \r\n              <a class="btn mini blue" ms-href="#!/Region/{{PID}}/{{obj.ID}}" >\r\n                查看下级地区\r\n              </a>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowUpdate(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <!--新增和修改-->\r\n  <div id="Add_Region_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd?\'新增\':\'修改\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n            <div class="row-fluid">\r\n              <div class="row-fluid">\r\n                <div class="span6 ">\r\n                  <div class="control-group">\r\n                    <label class="control-label  span3" for="Name">\r\n                      地区名称:<span class="required">*</span>\r\n                    </label>\r\n                    <div class="controls  span9">\r\n                      <input type="text" name="Account" class="m-wrap span11" placholder="请输入地区名称" ms-duplex="Name" />\r\n                      <span class="help-block"></span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_Region_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除该地区</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除该地区吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.region = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "region",
    dataList: {},
    title: '地区管理',
    limit: 20,
    isAdd:false,
    PID: 0,
    ID:'',
    Name:'',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    currentObj:'',
    load: function () {
        ajax.region.List(model.limit, model.currentPage, model.PID).done(function (data) {
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
    ShowUpdate: function (obj) {
        model.isAdd = false;
        model.Name = obj.Name;
        model.ID = obj.ID;
        $("#Add_Region_modal").modal('show');
    },
    ShowAdd: function () {
        model.isAdd = true;
        model.ID = 0;
        model.Name = '';
        $("#Add_Region_modal").modal('show');
    },
    Save: function () {
        if (model.Name == '') {
            rootVm.$alert('提示', '地区名称不能为空', 'error');
            return;
        }
        ajax.region.save(model.ID,model.Name,model.PID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                model.load();
                $("#Add_Region_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete : function(obj){
        model.currentObj = obj.$model;
        $("#Delete_Region_modal").modal('show');
    },
    Delete:function(){
        ajax.region.Del(model.currentObj.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_Region_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    }
});
avalon.scan();

exports.setPID = function(pid) {
    model.PID = pid;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "region";
}
 
});