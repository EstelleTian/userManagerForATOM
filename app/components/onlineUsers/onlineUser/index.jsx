import React from 'react'
import { browserHistory, hashHistory } from 'react-router'
import { Icon, Row, Col, Modal, Checkbox, Button} from 'antd'
import { sendLogoutUrl, getOnlineUserByTokenUrl, parseHalfFullTime } from '../../../utils/requestUrls'
import $ from 'jquery'
import "./onlineUser.less"

const OnlineUser = ({ userobj, forceLogout, selectedUser, toggleSlider}) => {
    const onClickLogout = (e) => {
        const token = userobj.token;
        const username = userobj.user.username;
        Modal.confirm({
            title: '确定强制退出用户'+username+'?',
            onOk(){
                sendLogout(token, username);
            }
        });
        e.stopPropagation();
        e.preventDefault();
    }


    const sendLogout = (token, username) => {
        // fetch(sendLogoutUrl,{
        //     mode: 'cors',
        //     method: 'POST',
        //     headers:{
        //         'content-type':'application/x-www-form-urlencoded'
        //     },
        //     body: "tokens=" + token
        // }).then(function(res) {
        //     res.json().then(function (json) {
        //         if(json.hasOwnProperty("error")){
        //             // const msg = json.error.msg || "";
        //             Modal.error({
        //                 title: "退出失败，用户"+username+"不存在!"
        //             })
        //         }else{
        //             Modal.success({
        //                 title: "用户"+username+"退出成功!"
        //             })
        //             forceLogout(token);
        //         }
        //     })
        // })
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: sendLogoutUrl,
            data: "tokens=" + token,
            type: 'post',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(json.hasOwnProperty("error")){
                    if( status == 500 ){
                        Modal.error({
                            title: "退出失败，用户"+username+"不存在!"
                        })
                    }else if( status == 400 ){
                        Modal.error({
                            title: "登录失效，请重新登录!",
                            onOk(){
                                browserHistory.push('/');
                            }
                        })
                    }
                }else if( status == 200 ){
                    Modal.success({
                        title: "用户"+username+"退出成功!"
                    })
                    forceLogout(token);
                }

            },
            error: function(err){
                console.error(err);
            }
        })

    }

    const toggleUserInfo = (token) => {
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        let url = getOnlineUserByTokenUrl;
        $.ajax({
            url: url,
            type: 'get',
            data: "token="+token,
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                if(json.hasOwnProperty("error") && json.status*1 == 400){
                    Modal.error({
                        title: "登录失效，请重新登录!",
                        onOk(){
                            browserHistory.push('/');
                        }
                    })
                }else if(json.hasOwnProperty("warn")){
                    Modal.error({
                        title: "获取用户信息失败，用户不存在!"
                    })
                }else{
                    toggleSlider(json);
                }
            },
            error: function(err){
                console.error(err);
            }
        })
        // const json = {
        //     generateTime: "201709151348",
        //     status: 200,
        //     token: "chongqingdev2|127.0.0.2|CRSZWWW|dcb6819f01b340b2a41bc61e78dbccc2-chongqingdev2",
        //     loginTime: "20170914101307",
        //     clientVersion: "V20170907",
        //     browserVersion: "60.0.3112.78",
        //     ipAddress: "127.0.0.2",
        //     username: "chongqingdev2",
        //     system: "CRS",
        //     systemType: "CRS.SW.MASTER",
        //     systemAdditionProp: "CRSZWWW",
        //     uploadTime: "20170914101307"
        // }
        // toggleSlider(json);

    }

    return(
        <Row className="us_user" onClick={e=>{
            toggleUserInfo(userobj.token);
            e.preventDefault();
            e.stopPropagation();
        }}>
            <Col span={24}>
                <Col span={4}>
                    <Icon className={userobj.online ? "us_user_icon online" : "us_user_icon offline"} type='team' />
                </Col>
                <Col span={17}>
                    <div className="us_user_name" title={userobj.user.username}>{userobj.user.username}</div>
                    <div>IP：{userobj.ipAddress}</div>
                    <div>客户端版本：{userobj.clientVersion}</div>
                    <div>
                        <Icon type="clock-circle-o" />：
                        <span className="us_user_loginTime">{parseHalfFullTime(userobj.loginTime)}</span>
                    </div>
                </Col>
                <Col span={1}>
                    <Checkbox
                    className="user_checkbox"
                    checked = { userobj.isActived }
                    onClick = {e => {
                        selectedUser(userobj.token);
                        e.stopPropagation()
                    }}
                />

                </Col>
            </Col>
            <Col lg={24} md={24}>
                <div className="us_user_options">
                <span onClick = {onClickLogout} >
                    <Icon type="logout" />
                    退出
                </span>
                </div>
            </Col>
        </Row>
    )
}


export default OnlineUser;