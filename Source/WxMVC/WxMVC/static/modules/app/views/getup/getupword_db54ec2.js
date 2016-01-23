define('app/views/getup/getupword', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="getupword">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowAdd">\r\n            <i class="icon-plus">\r\n            </i>新增标语\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              标语\r\n            </th>\r\n            <th>\r\n              封号\r\n            </th>\r\n            <th>\r\n              开始时间\r\n            </th>\r\n            <th>\r\n              结束时间\r\n            </th>\r\n            <th>\r\n              创建时间\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.Title}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.category.Name}}\r\n            </td>\r\n            <td style="max-width:200px;">\r\n              {{obj.CreateTime | datetostring | date("yyyy-MM-dd")}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowUpdate(obj)">\r\n                修改\r\n              </a>\r\n              <a class="btn mini blue" href="javascript:void(0)" ms-click="ShowDelete(obj)">\r\n                删除\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--添加新闻-->\r\n\r\n  <div id="Add_Text_modal" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        {{isAdd?\'新增文章\':\'修改文章信息\'}}\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="form">\r\n        <form action="#" id="BookFrom"  class="form-horizontal">\r\n          <div class="row-fluid">\r\n            <div class="row-fluid">\r\n              <div class="span12 ">\r\n                <div class="control-group">\r\n                  <div class="controls  span12">\r\n                    <input type="text" name="Name" class="m-wrap span12" placholder="请输入文章标题" ms-duplex="currentObj.Title" />\r\n                    <span class="help-block"></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="row-fluid">\r\n              <div class="span12 ">\r\n                <div class="control-group">\r\n                  <div class="controls  span12">\r\n                    <script id="editor" type="text/plain" style="height:500px;">\r\n                    </script>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button type="button" data-dismiss="modal" class="btn">\r\n        关闭\r\n      </button>\r\n      <button type="button" class="btn red" ms-click="Save()">\r\n        保存\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <!--删除组织机构窗口-->\r\n  <div id="Delete_Text_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\r\n      <h3 id="deleteDialogLabel">删除文章</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>警告：你确定要删除文章吗</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n      <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\r\n      <button class="btn btn-primary red" ms-click="Delete()">确定</button>\r\n    </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.getupword = tmpl();
var rootVm = avalon.vmodels['root'];

var model = avalon.define({
    $id: "getupword",
    dataList: {},
    title: '起床标语列表',
    limit: 20,
    isAdd: false,
    categoryid: 0,
    type: 'all',
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    ue: '',
    currentObj: {
        ID: 0,
        Title: '',
        Text: '',
        CreateTime: '',
        category: ''
    },
    load: function () {
        ajax.getupword.List(model.limit, model.currentPage, model.categoryid).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    $init: function () {
        //实例化编辑器
        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
        model.ue = UE.getEditor('editor');
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

    ShowAdd: function () {
        model.isAdd = true;
        model.currentObj.ID = '0';
        model.currentObj.Title = '';
        model.currentObj.Text = '';
        $("#Add_Text_modal").modal('show');
    },
    Save: function () {
        model.currentObj.Text = model.ue.getContent();
        if (model.currentObj.Title == '') {
            rootVm.$alert('提示', '标题不能为空', 'error');
            return;
        }
        if (model.currentObj.Text == '') {
            rootVm.$alert('提示', '内容不能为空', 'error');
            return;
        }
        ajax.getupword.save(model.currentObj.ID, model.currentObj.Title, model.currentObj.Text, model.categoryid).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '保存成功', 'success');
                model.load();
                $("#Add_Text_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowDelete: function (obj) {
        model.currentObj = obj.$model;
        $("#Delete_Text_modal").modal('show');
    },
    Delete: function () {
        ajax.getupword.Del(model.currentObj.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', '删除成功', 'success');
                model.load();
                $("#Delete_Text_modal").modal('hide');
            } else {
                rootVm.$alert('提示', data.msg, 'error');
            }
        });
    },
    ShowUpdate: function (obj) {
        model.isAdd = false;
        model.currentObj = obj.$model;
        $("#Add_Text_modal").modal('show');
        setTimeout(function () {
            model.ue.setContent(model.currentObj.Text);
        }, 1000);
    }

});

avalon.scan();

exports.setCategoryId = function (categoryid) {
    model.categoryid = categoryid;
    model.load();
    model.$init();
    avalon.vmodels.page.content = "getupword";
}
 
});