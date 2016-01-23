var avalon = require('vendor/avalon/avalon');
var tmplService = require('app/services/tmplService');

var tmpl = __inline('./sidebar.tmpl');
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