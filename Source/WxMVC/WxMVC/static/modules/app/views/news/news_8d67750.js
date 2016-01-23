define('app/views/news/news', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var ajax = require('app/services/ajaxService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid" ms-controller="news">\r\n  <!--表格-->\r\n  <div class="portlet box blue" >\r\n    <div class="portlet-title">\r\n      <div class="caption">\r\n        <i class="icon-edit">\r\n        </i>\r\n        {{title}}\r\n      </div>\r\n      <div class="tools">\r\n      </div>\r\n    </div>\r\n    <div class="portlet-body">\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="ShowSynchronizedData">\r\n            <i class="icon-refresh">\r\n            </i>同步微信文章\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <table class="table table-striped table-hover table-bordered">\r\n        <thead>\r\n          <tr>\r\n            <th>\r\n              标题\r\n            </th>\r\n            <th>\r\n              作者\r\n            </th>\r\n            <th>\r\n              分类\r\n            </th>\r\n            <th>\r\n              管理\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class="" ms-repeat-obj="dataList " style="max-height:100px;">\r\n            <td style="max-width:200px;">\r\n              {{obj.title}}\r\n            </td>\r\n            <td>\r\n              {{obj.author}}\r\n            </td>\r\n            <td>\r\n              {{obj.category == null? \'\':obj.category.Name}}\r\n            </td>\r\n            <td>\r\n              <a class="btn mini blue" ms-href="javascript:void(0);" ms-click="ShowCategory(obj)">\r\n                设置分类\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class="clearfix">\r\n        <div class="btn-group">\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            <i class="icon-step-backward">\r\n            </i>上一页\r\n          </a>\r\n          <a class="btn green" ms-click="PreviouPage()">\r\n            {{currentPage}}/{{pageCount}}\r\n          </a>\r\n          <a class="btn green" ms-click="NextPage()">\r\n            <i class="icon-step-forward">\r\n            </i>下一页\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!--设置分组窗口-->\r\n  <div id="ShowSetCategoryWin" class="modal modal-large hide fade" tabindex="-1" data-focus-on="input:first">\r\n    <div class="modal-header">\r\n      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\r\n      </button>\r\n      <h3>\r\n        选择分类\r\n      </h3>\r\n    </div>\r\n    <div class="modal-body" style="height: 300px;">\r\n      <div class="portlet box yellow">\r\n        <div class="portlet-title">\r\n          <div class="caption">\r\n            <i class="icon-coffee"></i>分类列表\r\n          </div>\r\n          <div class="tools">\r\n            <a href="javascript:void(0);" ms-click="loadCategory" class="reload"></a>\r\n          </div>\r\n        </div>\r\n        <div class="portlet-body">\r\n          <table class="table table-striped table-hover table-bordered">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  分类名称\r\n                </th>\r\n                <th>\r\n                  管理\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr class="" ms-repeat-obj="categoryList " style="max-height:100px;">\r\n                <td style="max-width:200px;">\r\n                  {{obj.Name}}\r\n                </td>\r\n                <td>\r\n                  <a class="btn mini blue" ms-click="SetCategory(obj.ID)" href="javascript:void(0);">\r\n                    选择该组\r\n                  </a>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!--信息提示-->\r\n  <div id="Hint_Msg_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="mrdirsDialogLabel" aria-hidden="true">\r\n    <div class="modal-header">\r\n      <h3 id="deleteDialogLabel">信息提示</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n      <div class="row-fluid">\r\n        <p>{{Msg}}</p>\r\n      </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n    </div>\r\n  </div>\r\n</div>\r\n';
}
return __p;
};
avalon.templateCache.news = tmpl();
var rootVm = avalon.vmodels['root'];
var model = avalon.define({
    $id: "news",
    Msg: '',
    dataList: {},
    title: '文章管理',
    limit: 20,
    currentPage: 1,
    pageCount: 0,
    pageList: 0,
    categoryList: [],
    Name: '',
    ID: '',
    Mark: '',
    CurrentGroup: '',
    TotalNumber: '',
    isAdd: false,
    CurrentId: 0,
    SaveGroup: function () {
    },
    load: function () {
        ajax.news.List(model.limit, model.currentPage).done(function (data) {
            model.dataList = data.items;
            model.currentPage = data.page;
            model.pageCount = data.totalPage;
            model.pageList = avalon.filters.pageCountToList(data.totalPage);
        });
    },
    loadCategory: function () {
        ajax.acitivity.List(9999, 1).done(function (data) {
            model.categoryList = data.items;
        });
    },
    ShowCategory: function (obj) {
        model.ID = obj.ID;
        $('#ShowSetCategoryWin').modal('show');
        
    },
    ShowSynchronizedData: function () {
        model.Msg = '正在同步微信文章数据，由于数据量太大，需要几分钟时间才能完成，请不要进行其他操作，谢谢配合，请耐心等待...';
        $('#Hint_Msg_modal').modal('show');
        ajax.news.SynchronizedData().done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#ShowSetCategoryWin").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
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
    },
    SetCategory: function (categoryId) {
        ajax.news.SetCategory(categoryId, model.ID).done(function (data) {
            if (data.success) {
                rootVm.$alert('提示', data.msg, 'success');
                $("#ShowSetCategoryWin").modal('hide');
                model.load();
            } else {
                rootVm.$alert('提示', data.msg, 'success');
            }
        });
    }
});
avalon.scan();
model.load();
model.loadCategory();
avalon.vmodels.page.content = "news";
 
});