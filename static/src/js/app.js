openerp.odoo_bbtodo = function(instance, local) {//名字一定要与模块名字意义，local就是instance.nmwlw
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    //对应的后台模型
    var TodosModel = new instance.web.Model('odoo_bbtodo.mymodel');

    local.AppView=instance.Widget.extend({
        template:"appview",
        start:function(){
            this.render();
        },
        //渲染
        render:function(){
            var self=this;
            //根据模型TodosModel渲染
            TodosModel.query(['id','name'])//id为对应主键
                .all().then(function(results){
                    _(results).each(function(model){
                        var todo=new local.TodosView(self,model);
                        todo.appendTo(self.$(".widget_todolist"));
                    })
                })
        },
        events:{
            "keypress .edit_input":"addItem",//在文本框内输入完成后按下回车
            "click .selectAll":function(){
                this.trigger("selectAll");//发出选择所有的信号
            },
            "click .deleteSelect":function(){

                this.trigger("deleteSelect");
            }

        },
        addItem:function(e) {
            var self=this;
            //如果添加的值为空的

            if (e.keyCode == 13) {

                if(this.$(".edit_input").val()==""){
                    $('.bs-example-modal-lg').modal();//弹出一个模态框
                    return;
                };
                mes=this.$('.edit_input').val();//获取输入的值
                TodosModel.call("addItem", [mes]).then(function(result){
                    var model={
                        "id":result,//返回的主键作为构造的参数
                        "name":mes
                    }
                    var todo=new local.TodosView(self,model);
                    todo.appendTo(self.$(".widget_todolist"));

                });//在后台模型中添加一个项
                this.$(".edit_input").val("");//对文本框清空
            }
        }
    });
    //组件2 用来显示todo的列表
    local.TodosView=instance.Widget.extend({
        tagName:"li",
        //template:"todoview",
        init:function(parent,model){
            this._super(parent);
            //this.set("model",model);
            this.model=model;//template 里面用到widget.model
        },
        render:function(){
            var self=this;
            this.$el.html(QWeb.render('todoview',{model:self.model}));
            this.$('.todoview_edit').hide();
        },
        text:function(){
            alert(1111111);
        },
        start:function(){
            this.render();
            var self=this;
            this.editInput=this.$('.todoview_edit');
            this.nameShow=this.$('.my-name');
            this.checkBox=this.$('.check_box');
            this.getParent().on("selectAll",this,this.selectAll);//父组件要求选择全部子组件
            this.getParent().on("deleteSelect",this,this.deleteSelect)
            this.$el.dblclick(function(){
                self.fn_editing();
            })
        },
        events:{
            "blur .todoview_edit":"fn_close_edit",
            "keypress .todoview_edit":"updateOnEnter",
            "click a":"mydestroy"
        },
        //响应父组件信号
        selectAll:function(){
            this.checkBox.attr("checked",true);
        },
        //响应父组件，如果选择框选择了就删除该项目
        deleteSelect:function(){
            if("checked"==this.checkBox.attr("checked")){
                this.mydestroy()
            }
        },
        //删除组件
        mydestroy:function(){
            this.destroy();
            TodosModel.call("deleteItem",[this.model.id]);
        },
        fn_editing:function(){
            this.editInput.show();
            this.editInput.focus();//获取焦点
            this.nameShow.hide();
            this.checkBox.hide();
        },
        fn_close_edit:function(){
            this.editInput.hide();
            this.nameShow.show();
            this.checkBox.show();
        },
        updateOnEnter:function(e){
            var self=this;
            if (e.keyCode == 13) {
                //更新后台的模型,以对应模型的id就是数据库里面的主键作为参数
                var newModel=this.model;
                newModel.name=this.editInput.val();
                this.model=newModel;
                TodosModel.call("changeItem",[this.model.id,this.model.name]).then(function(){
                    self.nameShow.html(newModel.name);
                    self.fn_close_edit();
                });
            }
        }
    });

    instance.web.client_actions.add('odoo_bbtodo_appview','instance.odoo_bbtodo.AppView');
}