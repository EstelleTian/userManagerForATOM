import React from 'react';
import { parseFullTime } from '../../utils/requestUrls'
import './sliderBar.less';
import { Icon, Col, Row } from 'antd'

const convertGroupsToString = (groups) => {
    let str = "";
    groups.map(group => (
        str += (group.description + '，') || ""
    ))
    str = str.substring(0, str.length-1);
    return str;
}

const SliderBar = ( { userObj, closeSlider } ) => (
    <div className="us_float_slider slider_open">
        <div className="header">
            <span className="header_name">用户详情</span>
            <Icon className="header_close" type="close"
                onClick = { e => {
                    closeSlider()
                    e.preventDefault()
                    e.stopPropagation()
                }}
            />
        </div>
        <div className="content">
            <Row>
                <Col span="24" className="sub_title">
                    用户信息
                </Col>
                <Col span="24" className="detail_line">
                    <Col span="7" className="us_panel">
                       用户名：
                    </Col>
                    <Col span="17">
                        <span>{userObj.user.username || ""}</span>
                    </Col>
                </Col>
                <Col span="24" className="detail_line">
                    <Col span="7" className="us_panel">
                        部门：
                    </Col>
                    <Col span="17">
                        <span>{convertGroupsToString(userObj.user.groups)}</span>
                    </Col>
                </Col>
                <Col span="24" className="detail_line">
                    <Col span="7" className="us_panel">
                        描述：
                    </Col>
                    <Col span="17">
                        <span>{userObj.user.descriptionCN || ""}</span>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col span="24" className="sub_title">
                    终端信息
                </Col>
                <Col span="24" className="detail_line">
                    <Col span="7" className="us_panel">
                        登录时间：
                    </Col>
                    <Col span="17">
                        <span>{parseFullTime(userObj.loginTime)}</span>
                    </Col>
                </Col>
                <Col span="24" className="detail_line">
                    <Col span="7" className="us_panel">
                        客户端版本:
                    </Col>
                    <Col span="17">
                        <span>{userObj.clientVersion || ""}</span>
                    </Col>
                </Col>
                <Col span="24" className="detail_line">
                    <Col span="7" className="us_panel">
                        IP：
                    </Col>
                    <Col span="17">
                        <span>{userObj.ipAddress || ""}</span>
                    </Col>
                </Col>
            </Row>


        </div>
    </div>
)

export default SliderBar;