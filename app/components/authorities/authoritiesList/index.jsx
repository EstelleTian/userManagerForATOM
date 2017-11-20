import React from 'react'
import $ from 'jquery'
import {browserHistory, hashHistory} from 'react-router'
import {Table, ICon, Button, Col, Row, Modal, Input} from 'antd'
import { getAuthoritiesListUrl, deleteAuthoritiesUrl } from '../../../utils/requestUrls'
import AuthoritiesModalContainer from '../../../container/authoritiesModalContainer'
const Search = Input.Search
import '../../common/atable.less'

class authoritiesList extends React.Component{
    constructor(props){
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.getDatas = this.getDatas.bind(this);
        this.retrieveAuthoritiesList = this.retrieveAuthoritiesList.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDel = this.onClickDel.bind(this);
    }

    componentDidMount(){
        this.retrieveAuthoritiesList()
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
        const { delOneAuth } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: deleteAuthoritiesUrl + id,
            type: 'DELETE',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status){
                    delOneAuth(id);

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
                title: "权限码",
                dataIndex: 'code',
                sorter: (a, b) => (a.code*1) - (b.code*1),
            }, {
                title: "权限名",
                dataIndex: 'name',
            },{
                title: "描述",
                dataIndex: 'description',
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
                                    this.onClickEdit(record.orgData)
                                }}
                        ></Button>
                        <Button type="default"
                                shape="circle"
                                icon="delete"
                                title="删除"
                                onClick={()=>{
                                    this.onClickDel(record.id, record.code)
                                }}
                        ></Button>
                    </div>
                )

            },
        ];
        return columns
    }

    //表数据处理
    getDatas(){
        const { authoritiesList } = this.props;
        let orgData = authoritiesList.data;
        let tableData = [];
        //遍历权限，补充key和操作列
        for(let n=0; n< orgData.length; n++){
            let oneRow = {
                ...orgData[n]
            };
            oneRow["key"] = n+1;
            oneRow["operators"] = "";
            oneRow["orgData"] = orgData[n];//原数据
            tableData.push(oneRow);
        }
        return tableData
    }

    //点击修改处理事件
    onClickEdit(orgData){
        //触发打开用户模块方法
        const { openAuthModal } = this.props;
        openAuthModal(orgData)
    }

    //点击删除处理事件
    onClickDel(id, code){
        //触发打开用户模块方法
        const _this = this;
        //根据ID获取用户信息
        Modal.confirm({
            title: "确认删除权限码："+ code +"?",
            maskClosable: true,
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                _this.sendDeleteAjax(id);
            }
        })
    }

    render(){
        const {  authoritiesList, openAuthModal, updateAuthSearch} = this.props;
        return(
            <div className="table_container">
                <Row span={24} className="table_nav">
                    <Col span={10}>
                        <span  className="table_title">权限列表</span>
                    </Col>
                    <Col span={14}>
                        <Col span={7} push={16}>
                            <Search
                                placeholder="自定义搜索"
                                style={{ width:210 }}
                                onSearch={value => updateAuthSearch(value)}
                            />
                        </Col>
                        <Col span={2} push={15}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    openAuthModal({})
                                }
                                }>
                                添加权限
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
                        loading={authoritiesList.loading}
                        columns={this.getColumns()}
                        dataSource={this.getDatas()}
                    />
                </Row>

                <AuthoritiesModalContainer></AuthoritiesModalContainer>
            </div>
        )
    }
}

export default authoritiesList;
