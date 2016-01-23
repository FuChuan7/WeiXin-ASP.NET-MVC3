// fis.config.set('modules.postpackager', 'simple');

// fis.config.set('pack', {
//     'pkg/jquery.plugin.js': [
//         '/modules/vendor/jquery/jquery.**.js'
//     ]
// });

//��̬��Դ������ʹ��pure release����ʱ�����--domains��-D����������Ч
fis.config.set('roadmap.domain', 'http://renxin120.cn:10032');

//���Ҫ���ݵͰ汾ie��ʾ͸��pngͼƬ����ʹ��pngquant��ΪͼƬѹ������
//����pngͼƬ͸��������ie�»���ʾ��ɫ����
//ʹ��spmx release����ʱ�����--optimize��-o����������Ч
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//����jshint���Ҫ�ų������ļ���Ĭ�ϲ����lib��jquery��backbone��underscore���ļ�
//ʹ��pure release����ʱ�����--lint��-l����������Ч
fis.config.set('settings.lint.jshint.ignored', ['lib/**', /jquery|backbone|underscore/i]);

fis.config.merge({
    deploy: {
        local: {
            to: '../vanke'
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
    reg: 'FrontEnd.csproj',
    release: false
}, {
    reg: 'FrontEnd.csproj.user',
    release: false
}, {
    reg: '/Views/Home/Index.cshtml',
    isHtmlLike: true
}, {
    reg: '/Views/User/Login.cshtml',
    isHtmlLike: true
});
