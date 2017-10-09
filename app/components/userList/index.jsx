import React from 'react'
import $ from 'jquery'
import { Row, Col} from 'antd'
import User from "../user"
import SliderBar from '../sliderBar'
import { getUserListUrl, sendMultiFiltersUrl} from '../../utils/requestUrls'
import './userList.less'


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.converUserList = this.converUserList.bind(this);
        this.retrieveUserList = this.retrieveUserList.bind(this);
    }

    componentDidMount(){
        const that = this;
        that.retrieveUserList();
        setInterval(function(){
            that.retrieveUserList();
        }, 1000*60);
    }

    converUserList(userList){
        let list = [];
        let {filterKey} = this.props;
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
        if(filterKey != "all"){
            for(let index in userList){
                const userObj = userList[index];
                let isShow = mapUserList(userObj, filterKey.toLowerCase()+"");
                if(isShow){
                    list.push(userObj);
                }
            }
        }else{
            list = userList
        }
        return list;
    }

    retrieveUserList(){
        const { updateUserList, multiFilterKey } = this.props;
        let hasMultiFilter = false;
        for(let key in multiFilterKey){
            if(multiFilterKey[key].trim() != ""){
                hasMultiFilter = true;
            }
        }

        if(hasMultiFilter){
            $.ajax({
                url: sendMultiFiltersUrl,
                data: multiFilterKey,
                type: 'POST',
                dataType: 'json',
                success: (res) => {
                    if("200" == res.status && res.hasOwnProperty("onLineUserResultList")){
                        const userList = res.onLineUserResultList || [];
                        updateUserList(userList);
                    }
                },
                error: (err) => {
                    console.error(err);
                }
            })
        }else{
            $.ajax({
                url: getUserListUrl,
                type: 'GET',
                dataType: 'json',
                success: function(json){
                    if(json.hasOwnProperty("warn")){
                        updateUserList({});
                    }else{
                        const userList = json.onLineUserResultList || [];
                        updateUserList(userList);
                    }
                },
                error: function(err){
                    console.error(err);
                }
            })
        }

    //     let userList = [
    //     {
    //         status: 0,
    //             token: "d798aa1c-ca41-48a2-96fe-0caabcbf242a-zbbbomcby8",
    //         user: {
    //         username: "zbbbomcby8",
    //             descriptionCN: "民航局空管局运行管理中心"
    //     },
    //         loginTime: "20170919140747",
    //             clientVersion: "1.1.0",
    //         ipAddress: "192.168.243.155"
    //     },
    //     {
    //         status: 0,
    //             token: "3a54d9d5-a843-4850-84b6-075c3754507b-zbbbomcby169",
    //         user: {
    //         username: "zbbbomcby16",
    //             descriptionCN: "民航局空管局运行管理中心"
    //     },
    //         loginTime: "20170919141512",
    //             clientVersion: "1.1.0",
    //         ipAddress: "192.168.243.41"
    //     },
    //     {
    //         status: 0,
    //             token: "4d57cb21-36f9-4768-a73f-0b6ee0e532c2-zbbbomcby168",
    //         user: {
    //         username: "zbbbomcby16",
    //             descriptionCN: "民航局空管局运行管理中心"
    //     },
    //         loginTime: "20170919141642",
    //             clientVersion: "1.1.0",
    //         ipAddress: "192.168.243.238"
    //     },{
    //             status: 0,
    //             token: "d798aa1c-ca41-48a2-96fe-0caabcbf242a-zbbbomcby867",
    //             user: {
    //                 username: "zbbbomcby8",
    //                 descriptionCN: "民航局空管局运行管理中心"
    //             },
    //             loginTime: "20170919140747",
    //             clientVersion: "1.1.0",
    //             ipAddress: "192.168.243.155"
    //         },
    //         {
    //             status: 0,
    //             token: "3a54d9d5-a843-4850-84b6-075c3754507b-zbbbomcby165",
    //             user: {
    //                 username: "zbbbomcby16",
    //                 descriptionCN: "民航局空管局运行管理中心"
    //             },
    //             loginTime: "20170919141512",
    //             clientVersion: "1.1.0",
    //             ipAddress: "192.168.243.41"
    //         },
    //         {
    //             status: 0,
    //             token: "4d57cb21-36f9-4768-a73f-0b6ee0e532c2-zbbbomcby164",
    //             user: {
    //                 username: "zbbbomcby16",
    //                 descriptionCN: "民航局空管局运行管理中心"
    //             },
    //             loginTime: "20170919141642",
    //             clientVersion: "1.1.0",
    //             ipAddress: "192.168.243.238"
    //         },{
    //             status: 0,
    //             token: "d798aa1c-ca41-48a2-96fe-0caabcbf242a-zbbbomcby83",
    //             user: {
    //                 username: "zbbbomcby8",
    //                 descriptionCN: "民航局空管局运行管理中心"
    //             },
    //             loginTime: "20170919140747",
    //             clientVersion: "1.1.0",
    //             ipAddress: "192.168.243.155"
    //         },
    //         {
    //             status: 0,
    //             token: "3a54d9d5-a843-4850-84b6-075c3754507b-zbbbomcby162",
    //             user: {
    //                 username: "zbbbomcby16",
    //                 descriptionCN: "民航局空管局运行管理中心"
    //             },
    //             loginTime: "20170919141512",
    //             clientVersion: "1.1.0",
    //             ipAddress: "192.168.243.41"
    //         },
    //         {
    //             status: 0,
    //             token: "4d57cb21-36f9-4768-a73f-0b6ee0e532c2-zbbbomcby161",
    //             user: {
    //                 username: "zbbbomcby16",
    //                 descriptionCN: "民航局空管局运行管理中心"
    //             },
    //             loginTime: "20170919141642",
    //             clientVersion: "1.1.0",
    //             ipAddress: "192.168.243.238"
    //         }
    // ]
    //     updateUserList(userList);
    }

    render(){
        const { forceLogout, selectedUser, toggleSlider, closeSlider, userList, sliderBar } = this.props;
        const visible = sliderBar.visible;
        const list = this.converUserList(userList);
        return(
            <Row className="no_margin">
                <Col span={23} className="m_l_10">
                {   list.length ?
                    list.map( userobj =>
                        <Col key={userobj.token} xl={3} lg={5} md={6}>
                            <User
                                userobj = {userobj}
                                forceLogout = {forceLogout}
                                selectedUser = {selectedUser}
                                toggleSlider = {toggleSlider}
                            ></User>
                        </Col>
                    ):
                    <div className="us_no_datas">暂无用户数据</div>
                }
                </Col>
                {
                    visible ? <SliderBar userObj = { sliderBar.userObj } closeSlider={closeSlider} />: ""
                }
            </Row>
        )
    }
}


export default UserList;