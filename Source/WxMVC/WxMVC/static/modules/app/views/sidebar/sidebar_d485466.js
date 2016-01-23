define('app/views/sidebar/sidebar', function(require, exports, module){ var avalon = require('vendor/avalon/avalon');
var tmplService = require('app/services/tmplService');

var tmpl = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul class="page-sidebar-menu" ms-controller="sidebar">\r\n\t<li>\r\n\t\t<!-- BEGIN SIDEBAR TOGGLER BUTTON -->\r\n\t\t<div class="sidebar-toggler hidden-phone"></div>\r\n\t\t<!-- BEGIN SIDEBAR TOGGLER BUTTON -->\r\n\t</li>\r\n\t<li ms-repeat-module="modules" ms-class-1="start:$first" ms-class-2="active:actived==module.name" ms-class-3="last:$last">\r\n\t\t<a ms-href="{{module.href}}">\r\n\t\t    <i ms-class="{{module.icon}}"></i> \r\n\t\t    <span class="title">{{module.title}}</span>\r\n\t\t    <span ms-class="selected:actived==module.name"></span>\r\n            <span ms-class="arrow:!module.leaf"></span>\r\n\t\t</a>\r\n\t\t<ul class="sub-menu" ms-if="module.children && module.children.size() > 0">\r\n\t\t\t<li ms-repeat-sub="module.children">\r\n\t\t\t\t<a ms-href="{{sub.href}}">\r\n\t\t\t\t    <i ms-class="{{sub.icon}}"></i>\r\n\t\t\t\t    {{sub.title}}\r\n                </a>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</li>\r\n</ul>';
}
return __p;
};
avalon.templateCache.sidebar = tmpl();

var model = avalon.define({
    $id: "sidebar",
    modules: [{
        name: 'home',
        title: '主页',
        icon: 'icon-home',
        href: '#!/',
        leaf: true,
        children: []
    }
    , {
        name: 'userCenter',
        title: '个人中心',
        icon: 'icon-user',
        href: '#!/profile',
        leaf: true
    }, {
        name: 'manager',
        title: '管理员管理',
        icon: 'icon-user',
        href: '#!/manager',
        leaf: true
    }, {
        name: 'wxUser',
        title: '微信用户管理',
        icon: 'icon-user',
        href: '#!/wxuser',
        leaf: true
    }],
    actived: 'home',

    openView: function (view, parent) {
        // 如果是叶子节点，则可以触发视图变化事件
        if (view.leaf) {
            if (view.name == 'project') {
                location.href = '#!/project';
                return;
            } else {
                location.hash = '#!';
            }
            // 菜单的视图变化
            model.actived = view.level == 2 ? parent.name : view.name;
            // 标题的变化
            var rootVm = avalon.vmodels.root;
            rootVm.title = view.title;
            // 组装面包屑
            rootVm.breads = [];
            if (view.level == 2) {
                rootVm.breads.push({
                    icon: parent.icon,
                    title: parent.title
                }, {
                    icon: view.icon,
                    title: view.title
                });
            } else {
                rootVm.breads.push({
                    icon: view.icon,
                    title: view.title
                });
            }
            // 主页面视图变化
            tmplService.assignTmpl(view);
        }
    }
});
avalon.scan($('div[ms-controller=sidebar]')[0]);

avalon.vmodels.root.sidebar = "sidebar"; 
});