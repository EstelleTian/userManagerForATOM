import React from 'react'
import $ from 'jquery'
import {browserHistory, hashHistory} from 'react-router'
import {Table, ICon, Button, Col, Row, Modal, Input} from 'antd'
import { getRolesListUrl, getAuthoritiesListUrl, deleteRolesUrl } from '../../../utils/requestUrls'
import RoleModalContainer from '../../../container/roleModalContainer'
const Search = Input.Search
import '../../common/atable.less'

class rolesList extends React.Component{
    constructor(props){
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.getDatas = this.getDatas.bind(this);
        this.retrieveRoleList = this.retrieveRoleList.bind(this);
        this.retrieveAuthoritiesList = this.retrieveAuthoritiesList.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDel = this.onClickDel.bind(this);
    }

    componentDidMount(){
        this.retrieveRoleList()
        //检测权限数据是否有，若没有，手动提前获取
        const { authoritiesList } = this.props;
        if( authoritiesList.data.length == 0 ){
            this.retrieveAuthoritiesList();
        }

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

    //获取权限列表
    retrieveAuthoritiesList(){
        const { refreshAuths } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: getAuthoritiesListUrl,
            type: 'get',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status && json.hasOwnProperty("authoritySet")){
                    const authoritySet = json.authoritySet || [];
                    const params = {
                        data: authoritySet,
                        loading: false
                    }
                    refreshAuths(params);
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
                console.error("retrieve authorities list failed:");
                console.error(err);
            }
        })
    }

    //删除请求
    sendDeleteAjax(id){
        const { delOneRole } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: deleteRolesUrl + id,
            type: 'DELETE',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status){
                    delOneRole(id);
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
                width: '5%',
                sorter: (a, b) => a.key - b.key,
            }, {
                title: "角色名",
                dataIndex: 'name'
            }, {
                title: "描述",
                dataIndex: 'description'
            },
            // {
            //     title: "权限",
            //     dataIndex: 'authstr',
            //     render: (text) => (
            //         <span className="auth_content">{text}</span>
            //     )
            // },
            {
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
                                    this.onClickEdit(record.orgData)
                                }}
                        ></Button>
                        <Button type="default"
                                shape="circle"
                                icon="delete"
                                title="删除"
                                onClick={()=>{
                                    this.onClickDel(record.id, record.name)
                                }}
                        ></Button>
                    </div>
                )

            },
        ];
        return columns
    }

    //
    getDatas(){
        const { roleList } = this.props;
        let orgData = roleList.data;
        let tableData = [];
        //遍历角色，补充key和操作列
        for(let n=0; n< orgData.length; n++){
            const role = orgData[n];
            let oneRow = {};
            oneRow["key"] = n+1;
            oneRow["id"] = role.id;
            oneRow["name"] = role.name;
            oneRow["description"] = role.description;
            oneRow["operators"] = "";
            oneRow["orgData"] = orgData[n];//原数据
            // //处理权限字段
            // const authorities = role.authorities;
            // let authstr = "";
            // //过滤权限，提取权限描述字段拼接
            // authorities.forEach( auth => {
            //     authstr += auth.description+","
            // })
            // //截取尾巴,
            // oneRow["authstr"] = authstr.substring(0, authstr.length-1);
            tableData.push(oneRow);
        }
        return tableData
    }

    //点击修改处理事件
    onClickEdit(orgData){
        //触发打开用户模块方法
        const { openRoleModal, setDefaultData } = this.props;

        const authorities = orgData.authorities;
        let authIdstr = "";
        //过滤权限，提取权限描述字段拼接
        authorities.forEach( auth => {
            authIdstr += auth.id+","
        })
        //截取尾巴,
        authIdstr = authIdstr.substring(0, authIdstr.length-1);

        //设置checkbox默认值
        setDefaultData(authIdstr)
        //打开模态框
        openRoleModal(orgData)
    }

    //点击删除处理事件
    onClickDel(id, name){
        //触发打开用户模块方法
        const _this = this;
        //根据ID获取用户信息
        Modal.confirm({
            title: "确认删除角色"+ name +"?",
            maskClosable: true,
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                _this.sendDeleteAjax(id);
            }
        })
    }

    render(){
        const {  roleList, openRoleModal, updateRoleSearch } = this.props;
        return(
            <div className="table_container">
                <Row span={24} className="table_nav">
                    <Col span={10}>
                        <span  className="table_title">角色列表</span>
                    </Col>
                    <Col span={14}>
                        <Col span={7} push={16}>
                            <Search
                                placeholder="自定义搜索"
                                style={{ width:210 }}
                                onSearch={value => updateRoleSearch(value)}
                            />
                        </Col>
                        <Col span={2} push={15}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    //打开模态框
                                    openRoleModal({})
                                }
                                }>
                                添加角色
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
                        loading={roleList.loading}
                        columns={this.getColumns()}
                        dataSource={this.getDatas()}
                    />
                </Row>

                <RoleModalContainer></RoleModalContainer>
            </div>
        )
    }
}

export default rolesList;
