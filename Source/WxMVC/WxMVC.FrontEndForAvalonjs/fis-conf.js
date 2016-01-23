// fis.config.set('modules.postpackager', 'simple');

// fis.config.set('pack', {
//     'pkg/jquery.plugin.js': [
//         '/modules/vendor/jquery/jquery.**.js'
//     ]
// });

//静态资源域名，使用pure release命令时，添加--domains或-D参数即可生效
//fis.config.set('roadmap.domain', 'http://localhost:9471');
fis.config.set('roadmap.domain', '');
//如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
//否则png图片透明部分在ie下会显示灰色背景
//使用spmx release命令时，添加--optimize或-o参数即可生效
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用pure release命令时，添加--lint或-l参数即可生效
fis.config.set('settings.lint.jshint.ignored', ['lib/**', /jquery|backbone|underscore/i]);

fis.config.merge({
    deploy: {
        local: {
            to: '../WxMVC'
        }
    }
});

if (!fis.config.get('roadmap.path')) {
    fis.config.set('roadmap.path', []);
}
fis.config.set('dist', '/Dist');
fis.config.get('roadmap.path').unshift({
    reg: '/bin/**',
    release: false
}, {
    reg: '/obj/**',
    release: false
}, {
    reg: '/Properties/**',
    release: false
}, {
    reg: '**.bat',
    release: false
}, {
    reg: 'index.html',
    release: false
}, {
    reg: 'FrontEnd.csproj',
    release: false
}, {
    reg: 'FrontEnd.csproj.user',
    release: false
}, {
    reg: '/Views/Home/Index.cshtml',
    isHtmlLike: true
}, {
    reg: '/Views/Manager/Login.cshtml',
    isHtmlLike: true
});
 