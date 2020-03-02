/**
 * 详情对话框
 */
var ArticleInfoDlg = {
    data: {
        content: "",
        updateDate: "",
        createDate: "",
        articleKey: "",
        name: "",
        id: ""
    }
};

layui.use(['form', 'admin', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;

    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/article/detail?id=" + Feng.getUrlParam("id"));
    var result = ajax.start();
    if(result!=null&&result.data!=null){
        form.val('articleForm', result.data);
        if(result.data.content!=null){
            editor.txt.html(result.data.content);
        }
    }

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/article/editItem", function (data) {
            Feng.success("更新成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        data.field.content = editor.txt.html();
        ajax.set(data.field);
        ajax.start();

        return false;
    });

});