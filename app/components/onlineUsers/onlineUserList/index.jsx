import React from 'react'
import $ from 'jquery'
import { browserHistory, hashHistory } from 'react-router'
import { Row, Col, Progress} from 'antd'
import OnlineUser from "../onlineUser/index"
import SliderBar from '../sliderBar/index'
import { getOnlineUserListUrl, sendMultiFiltersUrl} from '../../../utils/requestUrls'
import FilterContainer from '../../../container/filterContainer/index'
import './onlineUserList.less'


class OnlineUserList extends React.Component{
    constructor(props){
        super(props);
        this.converUserList = this.converUserList.bind(this);
        this.retrieveUserList = this.retrieveUserList.bind(this);
    }

    componentDidMount(){
        const that = this;
        that.retrieveUserList();
        //定时刷新用户列表
        setInterval(function(){
            that.retrieveUserList();
        }, 1000*10);
    }

    converUserList(userList){
        let list = [];
        let {filterKey} = this.props;
        //用户是否包含查询关键字
        const mapUserList = (userObj, filterkey) => {
            let isShow = false;
            for(let item in userObj){
                let key = userObj[item];
                if(typeof key == 'object'){
                    isShow = mapUserList(key ,filterkey);
                }else if(typeof key == 'string'){
                    if(key.toLowerCase().indexOf(filterkey) > -1){
                        isShow = true;
                        break;
                    }
                }
            }
            return isShow;
        }
        //若自定义查询不是'all',根据查询字查询
        if(filterKey != "all"){
            for(let index in userList){
                const userObj = userList[index];
                let isShow = mapUserList(userObj, filterKey.toLowerCase()+"");
                if(isShow){
                    list.push(userObj);
                }
            }
        }else{
            //若自定义查询是'all' 显示全部
            list = userList
        }
        return list;
    }

    //获取全部用户
    retrieveUserList(){
        const { updateOnlineUserList, multiFilterKey } = this.props;
        //是否有多条件查询
        let hasMultiFilter = false;
        for(let key in multiFilterKey){
            if(multiFilterKey[key].trim() != ""){
                hasMultiFilter = true;
            }
        }
        let $usNoData = $(".us_no_datas");
        if( $usNoData.length != 0 ){
            $usNoData.html("用户查询中...");
        }
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        //若有多条件查询，执行条件查询用户接口
        if(hasMultiFilter){
            $.ajax({
                url: sendMultiFiltersUrl,
                data: multiFilterKey,
                type: 'POST',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", UUMAToken);
                },
                success: (json) => {
                    const status = json.status*1 || 0;
                    if(200 == status && json.hasOwnProperty("onLineUserResultList")){
                        const userList = json.onLineUserResultList || [];
                        updateOnlineUserList(userList);
                    }else if( 400 == status ){
                        Modal.error({
                            title: "登录失效，请重新登录!",
                            onOk(){
                                hashHistory.push('/');
                            }
                        })
                    }else{
                        console.error("received data is invalida.");
                        console.error(json);
                    }
                },
                error: (err) => {
                    console.error(err);
                }
            })
        }else{//若没有多条件查询，执行查询全部在线用户接口
            let _this = this;
            $.ajax({
                url: getOnlineUserListUrl,
                type: 'GET',
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", UUMAToken);
                },
                success: function(json){
                    const status = json.status*1;
                    if( status == 200 ){
                        if(json.hasOwnProperty("warn")){
                            updateOnlineUserList({});
                        }else{
                            const userList = json.onLineUserResultList || [];
                            updateOnlineUserList(userList);
                        }
                    }else if( json.hasOwnProperty("error") && status == 400 ){
                        hashHistory.push('/');
                    }
                },
                error: function(err){
                    //若失败，进入后判断是否是未登录，若未登录则进入调整到登录页面
                    console.error(err);
                }
            })
        }
    }

    render(){
        const { forceLogout, selectedUser, toggleSlider, closeSlider, userList, sliderBar } = this.props;
        const visible = sliderBar.visible;
        const list = this.converUserList(userList);
        return(
            <div className="us_cantainer">
                <FilterContainer></FilterContainer>
                <Row className="no_margin">
                    {/*<Progress percent={this.state.percent} strokeWidth={5} status="active" showInfo={false} />*/}
                    <Col span={23} className="m_l_10">
                        {   list.length ?
                            list.map( userobj =>
                                <Col key={userobj.token} xl={3} lg={5} md={6}>
                                    <OnlineUser
                                        userobj = {userobj}
                                        forceLogout = {forceLogout}
                                        selectedUser = {selectedUser}
                                        toggleSlider = {toggleSlider}
                                    ></OnlineUser>
                                </Col>
                            ):
                            <div className="us_no_datas">暂无用户数据</div>
                        }
                    </Col>
                    {
                        visible ? <SliderBar userObj = { sliderBar.userObj } closeSlider={closeSlider} />: ""
                    }
                </Row>
            </div>

        )
    }
}

export default OnlineUserList;