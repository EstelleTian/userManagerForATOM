import React from 'react'
import $ from 'jquery'
import { browserHistory,hashHistory } from 'react-router'
import {Table, ICon, Button, Col, Row, Modal, Input} from 'antd'
import { getUsersListUrl, getRolesListUrl, getGroupsListUrl, deleteUsesrUrl } from '../../../utils/requestUrls'
import UserModalContainer from '../../../container/userModalContainer'
const Search = Input.Search
import '../../common/atable.less'

class rolesList extends React.Component{
    constructor(props){
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.getDatas = this.getDatas.bind(this);
        this.retrieveUserList = this.retrieveUserList.bind(this);
        this.retrieveRoleList = this.retrieveRoleList.bind(this);
        this.retrieveGroupList = this.retrieveGroupList.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDel = this.onClickDel.bind(this);
    }

    componentDidMount(){
        this.retrieveUserList()
        //检测角色、组数据是否有，若没有，手动提前获取
        const { roleList, groupList } = this.props;
        if( roleList.data.length == 0 ){
            this.retrieveRoleList();
        }
        if( groupList.data.length == 0 ){
            this.retrieveGroupList();
        }
    }

    //获取用户列表
    retrieveUserList(){
        const { refreshUsers } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: getUsersListUrl,
            type: 'get',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status && json.hasOwnProperty("userSet")){
                    const userSet = json.userSet || [];
                    const params = {
                        data: userSet,
                        loading: false
                    }
                    refreshUsers(params);
                }else if( 400 == status ){
                    Modal.error({
                        title: "登录失效，请重新登录!",
                        onOk(){
                            browserHistory.push('/');
                        }
                    })
                }else{
                    console.error("received data is invalida.");
                    console.error(json);
                }
            },
            error: function(err){
                console.error("retrieve user list failed:");
                console.error(err);
            }
        })
    }

    //获取角色列表
    retrieveRoleList(){
        const { refreshRoles } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: getRolesListUrl,
            type: 'get',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status && json.hasOwnProperty("roleSet")){
                    const roleSet = json.roleSet || [];
                    const params = {
                        data: roleSet,
                        loading: false
                    }
                    refreshRoles(params);
                }else if( 400 == status ){
                    Modal.error({
                        title: "登录失效，请重新登录!",
                        onOk(){
                            browserHistory.push('/');
                        }
                    })
                }else{
                    console.error("received data is invalida.");
                    console.error(json);
                }
            },
            error: function(err){
                console.error("retrieve role list failed:");
                console.error(err);
            }
        })
    }

    //获取组列表
    retrieveGroupList(){
        const { refreshGroups } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: getGroupsListUrl,
            type: 'get',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status && json.hasOwnProperty("groupSet")){
                    const groupSet = json.groupSet || [];
                    const params = {
                        data: groupSet,
                        loading: false
                    }
                    refreshGroups(params);
                }else if( 400 == status ){
                    Modal.error({
                        title: "登录失效，请重新登录!",
                        onOk(){
                            browserHistory.push('/');
                        }
                    })
                }else{
                    console.error("received data is invalida.");
                    console.error(json);
                }
            },
            error: function(err){
                console.error("retrieve role list failed:");
                console.error(err);
            }
        })
    }

    //删除请求
    sendDeleteAjax(id){
        const { delOneUser } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: deleteUsesrUrl + id,
            type: 'DELETE',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status){
                    delOneUser(id);

                }else if( 500 == status && json.hasOwnProperty("error")  ){
                    const error = json.error.message ? json.error.message : "";
                    Modal.error({
                        title: "失败",
                        content: error,
                        okText: "确定"
                    })
                }else{
                    console.error("received data is invalida.");
                    console.error(json);
                }
            },
            error: function(err){
                console.error("delete group is failed.");
                console.error(err);
            }
        })
    }

    //列配置
    getColumns(){
        const columns = [
            {
                title: "序号",
                dataIndex: 'key',
                width: '7%',
                sorter: (a, b) => a.key - b.key,
            },{
                title: "用户名",
                dataIndex: 'username',
                width: '10%',
            }, {
                title: "中文描述",
                dataIndex: 'descriptionCN',
                width: '15%',
            }, {
                title: "英文描述",
                dataIndex: 'descriptionEN',
                width: '15%',
            },{
                title: "部门/组",
                dataIndex: 'groupstr',
                width: '15%',
                render: (text) => (
                    <span className="auth_content">{text}</span>
                )
            }, {
                title: "角色",
                dataIndex: 'rolestr',
                render: (text) => (
                    <span className="auth_content">{text}</span>
                )
            }, {
                title: "操作",
                dataIndex: 'operators',
                width: '10%',
                render : ( text, record, index ) => (
                        <div className="table_opts">
                            <Button type="primary"
                                    shape="circle"
                                    icon="edit"
                                    title="修改"
                                    onClick={()=>{
                                        this.onClickEdit(record.user)
                                    }}
                            ></Button>
                            <Button type="default"
                                    shape="circle"
                                    icon="delete"
                                    title="删除"
                                    onClick={()=>{
                                        this.onClickDel(record.id, record.username)
                                    }}
                            ></Button>
                        </div>
                    )
            },
        ];
        return columns
    }

    //表格数据处理
    getDatas(){
        const { userList } = this.props;
        let orgData = userList.data;
        let tableData = [];
        //遍历用户，补充key和操作列
        for(let n=0; n< orgData.length; n++){
            const user = orgData[n];
            let oneRow = {};
            oneRow["key"] = n+1;
            oneRow["id"] = user.id;
            oneRow["username"] = user.username;
            oneRow["descriptionCN"] = user.descriptionCN;
            oneRow["descriptionEN"] = user.descriptionEN;
            oneRow["user"] = user;
            oneRow["operators"] = "";
            //处理组字段
            const groups = user.groups;
            let groupstr = "";
            //过滤组，提取组描述字段拼接
            groups.forEach( g => {
                groupstr += g.description+"，"
            })
            //截取尾巴,
            oneRow["groupstr"] = groupstr.substring(0, groupstr.length-1);
            //处理用户字段
            const roles = user.roles;
            let rolestr = "";
            //过滤用户，提取用户描述字段拼接
            roles.forEach( r => {
                rolestr += r.description+"，"
            })
            //截取尾巴,
            oneRow["rolestr"] = rolestr.substring(0, rolestr.length-1);
            //添加一条数据
            tableData.push(oneRow);
        }
        return tableData
    }

    //点击修改处理事件
    onClickEdit(orgData){
        //根据ID获取用户信息

        //触发打开用户模块方法
        const { openUserModal, setRoleDefaultData, setGroupDefaultData, updateUserSearch } = this.props;
        const roles = orgData.roles;
        let rolesIdstr = "";
        //过滤权限，提取权限描述字段拼接
        roles.forEach( role => {
            rolesIdstr += role.id+","
        })
        //截取尾巴,
        rolesIdstr = rolesIdstr.substring(0, rolesIdstr.length-1);
        //设置checkbox默认值
        setRoleDefaultData(rolesIdstr)

        const groups = orgData.groups;
        let groupIdstr = "";
        //过滤权限，提取权限描述字段拼接
        groups.forEach( group => {
            groupIdstr += group.id+","
        })
        //截取尾巴,
        groupIdstr = groupIdstr.substring(0, groupIdstr.length-1);

        setGroupDefaultData(groupIdstr);
        openUserModal(orgData)
    }

    //点击删除处理事件
    onClickDel(id, name){
        //触发打开用户模块方法
        const _this = this;
        //根据ID获取用户信息
        Modal.confirm({
            title: "确认删除用户"+ name +"?",
            maskClosable: true,
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                _this.sendDeleteAjax(id);
            }
        })
    }

    render(){
        const {  userList, openUserModal, updateUserSearch } = this.props;
        return(
            <div className="table_container">
                <Row span={24} className="table_nav">
                    <Col span={10}>
                        <span  className="table_title">用户列表</span>
                    </Col>
                    <Col span={14}>
                        <Col span={7} push={16}>
                            <Search
                                placeholder="自定义搜索"
                                style={{ width:210 }}
                                onSearch={value => updateUserSearch(value)}
                            />
                        </Col>
                        <Col span={2} push={15}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    openUserModal({})
                                }
                                }>
                                添加用户
                            </Button>
                        </Col>

                    </Col>
                </Row>
                <Row span={24} className="table_canvas">
                    <Table
                        bordered
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger:true,
                            showTotal : total => `总计 ${total} 条`
                        }}
                        loading={userList.loading}
                        columns={this.getColumns()}
                        dataSource={this.getDatas()}
                    />
                </Row>

                <UserModalContainer></UserModalContainer>
            </div>
        )
    }
}

export default rolesList;
