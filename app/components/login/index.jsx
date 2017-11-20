import React from 'react'
import {Form, Icon, Input, Checkbox, Button, Alert} from 'antd'
import { browserHistory, hashHistory } from 'react-router'
import { loginUrl } from '../../utils/requestUrls'
import $ from 'jquery'
import "./login.less"

const FormItem = Form.Item

class LoginForm extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const _form = this.props.form;
        _form.validateFieldsAndScroll((err, values) => {
            //success
            if (!err) {
                const userLogin = this.props.userLogin;
                const username = values.username.trim();
                const password = values.password.trim();
                $.ajax({
                    url: loginUrl,
                    data: "username=" + username + "&password=" + password,
                    type: 'get',
                    dataType: 'json',
                    success: function(json){
                        if( json.hasOwnProperty("token") && json.token.trim() != "" ){
                            sessionStorage.setItem("UUMAToken", json.token);
                            if( 200 == json.status*1 ){
                                let param = {
                                    username,
                                    password,
                                    loginStatus: true
                                }
                                userLogin(param);
                                localStorage.setItem('username', username);
                                browserHistory.push('/home');
                            }
                        }else if( 500 == json.status*1 && json.hasOwnProperty("error")  ){
                            const error = json.error.message ? json.error.message : "";
                            // let errmsg = "";
                            // switch(error){
                            //     case "USER IS NOT EXIST":
                            //         errmsg = "用户名不存在"; break;
                            //     case "USERNAME IS NULL":
                            //         errmsg = "用户名不能为空"; break;
                            //     case "PASSWORD IS WRONG" :
                            //         errmsg = "密码错误"; break;
                            //     case "PASSWORD IS NULL" :
                            //         errmsg = "密码不能为空"; break;
                            // }
                            let param = {
                                errmsg: error
                            }
                            userLogin(param);
                            _form.resetFields();
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

    notEmpty = (rule, value, callback) => {
        if(value == undefined || null == value || value.trim() == ""){
            const name = rule.field;
            switch(name){
                case "username" : callback("用户名不能为空！");
                case "password" : callback("密码不能为空！");
            }
        }else{
            callback();
        }
    }

    render(){
        const { login } = this.props;
        const { getFieldDecorator } = this.props.form;
        const rulesGenerate = {
            username: getFieldDecorator("username", {
                rules: [
                    // {required: true, message: "用户名不能为空！"},
                    {validator : this.notEmpty}
                ]
            }),
            password: getFieldDecorator("password", {
                rules: [{validator : this.notEmpty}]
            }),
        };
        return (
            <div className="login">
                <div className="content">
                    <Form className="login_form" onSubmit={this.handleSubmit}>
                        <FormItem>
                            <h3 className="title">ATOM用户管理</h3>
                        </FormItem>
                        <FormItem>
                            {
                                (!login.loginStatus && login.errmsg != "")  ?  <Alert
                                    message={ login.errmsg }
                                    type="error"
                                /> : ""
                            }

                        </FormItem>
                        <FormItem>
                            {
                                rulesGenerate.username(
                                    <Input prefix={<Icon type="user" />} className="form_input"  placeholder="用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                rulesGenerate.password(
                                    <Input prefix={<Icon type="lock" />} type="password" className="form_input" placeholder="密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login_button">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const Login = Form.create()(LoginForm);

export default Login;

