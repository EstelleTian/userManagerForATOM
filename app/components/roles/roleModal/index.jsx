import React from 'react'
import $ from 'jquery'
import {Modal, Button, Form, Input, Tabs, Row } from 'antd'
import RoleModalCbContainer from '../../../container/roleModalCbContainer'
import { updateRolesUrl } from '../../../utils/requestUrls'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

//添加、修改角色表单
class ModalForm extends React.Component {
    constructor(props){
        super(props)
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //提交页面
    handleSubmit(e) {
        e.preventDefault();
        const { form, roleModal, updateRoles, closeRoleModal, authCbChooseStr } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            //success
            if (!err) {
                let params = values;
                //拼接权限值到params中
                let authCbChooseArr = authCbChooseStr.split(",");
                params["authorities"] = [];
                authCbChooseArr.forEach( id => {
                    if(id.trim() != ""){
                        params["authorities"].push({id: id})
                    }
                })
                //根据id验证是添加（无id）还是修改（有id）
                const oid = roleModal.data.id || "";
                let ajaxType = "post";
                //不为空 为修改
                if( "" != oid){
                    params["id"] = oid;
                    ajaxType = "put";
                }
                const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
                $.ajax({
                    url: updateRolesUrl,
                    data: JSON.stringify(params),
                    type: ajaxType,
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: (request) => {
                        request.setRequestHeader("Authorization", UUMAToken);
                    },
                    success: function(json){
                        const status = json.status*1;
                        //成功
                        if( 200 == status ){
                            if( json.hasOwnProperty("role") && json.role.id){
                                // 更新数据
                                updateRoles({...json.role});
                                form.resetFields();
                                //关闭modal
                                closeRoleModal();
                            }else{
                                console.warn("Can't receive group key.")
                            }
                        }else if(400 == status && json.hasOwnProperty("error")  ){
                            const error = json.error.message ? json.error.message : "";
                            Modal.error({
                                title: "失败",
                                content: error,
                                okText: "确定"
                            })
                        }else{
                            console.warn("Request return unkown datas.")
                        }
                    },
                    error: function(err){
                        console.error(err);
                    }
                })

            }else{
                console.error(err);
            }
        });
    }

    //重置页面
    handleReset() {
        const { form, resetChooseData } = this.props;
        //重置多选按钮
        resetChooseData();
        form.resetFields();
    }

    render(){
        const { roleModal, authoritiesList, closeRoleModal } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },

            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const rulesGenerate = {
            name : getFieldDecorator('name', {
                initialValue: roleModal.data.name || "",
                rules : [{
                    required: true,
                    validator : (rule, value, callback) => {
                        if(value.trim() == ""){
                            callback("必填项")
                        }else{
                            const reg = /^[a-zA-Z0-9_]*$/;
                            let flag = reg.test(value);
                            //true正确
                            if(flag){
                                callback()
                            }else{
                                callback("只允许数字、字母、下划线")
                            }
                        }
                    }
                }]
            }),
            description : getFieldDecorator('description', {
                initialValue: roleModal.data.description || "",
                rules : [{
                    required: true,
                    validator : (rule, value, callback) => {
                        if(value.trim() == ""){
                            callback("必填项")
                        }else{
                            callback()
                        }
                    }
                }]
            })
        };
        return(
            <Form onSubmit={this.handleSubmit} >
                <FormItem
                    {...formItemLayout}
                    label="角色名"
                    hasFeedback={true}
                >
                    {rulesGenerate.name(<Input prefix={""} className="form_input"  placeholder=""/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                    hasFeedback={true}
                >
                    {rulesGenerate.description(<Input prefix={""} className="form_input"  placeholder=""/>)}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 24}}
                    hasFeedback={true}
                    className="checkbox_content"
                >
                    <div className="card-container">
                        <Tabs type="card">
                            <TabPane tab="权限配置" key="1">
                                <Row>
                                    {
                                        authoritiesList.data.map( auth => (
                                            <RoleModalCbContainer
                                                key = {auth.id}
                                                id = {auth.id}
                                                obj = {auth}
                                            />
                                        ))
                                    }
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 7, offset: 17 }}
                    hasFeedback={true}
                    className="form_footer"
                >
                    <Button type="primary" htmlType="submit" className="login_button">
                        确定
                    </Button>
                    <Button onClick={this.handleReset}>
                        重置
                    </Button>
                    <Button onClick={closeRoleModal}>
                        取消
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

ModalForm = Form.create()(ModalForm);

//添加、修改角色模态框
class roleModal extends React.Component{
    render(){
        const { roleModal, closeRoleModal} = this.props;
        const title = roleModal.isAdd ? "添加" : "修改";
        return (
            <div>
                <Modal
                    title={`${title}角色`}
                    maskClosable={false}
                    visible={roleModal.visible}
                    onCancel={closeRoleModal}
                    width="850"
                    footer={null}
                >
                    <ModalForm
                        {...this.props}
                    />
                </Modal>
            </div>
        )
    }
}

export default roleModal;