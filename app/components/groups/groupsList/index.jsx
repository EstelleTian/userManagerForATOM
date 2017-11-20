import React from 'react'
import $ from 'jquery'
import {browserHistory, hashHistory} from 'react-router'
import {Table, ICon, Button, Col, Row, Modal, Input} from 'antd'
import { getGroupsListUrl, deleteGroupstUrl } from '../../../utils/requestUrls'
import GroupModalContainer from '../../../container/groupModalContainer'
const Search = Input.Search
import '../../common/atable.less'

class groupsList extends React.Component{
    constructor(props){
        super(props);
        this.getColumns = this.getColumns.bind(this);
        this.getDatas = this.getDatas.bind(this);
        this.retrieveGroupList = this.retrieveGroupList.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDel = this.onClickDel.bind(this);
    }

    componentDidMount(){
        this.retrieveGroupList()
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
        const { delOneGroup } = this.props;
        //取用户token
        const UUMAToken = sessionStorage.getItem("UUMAToken") || "";
        $.ajax({
            url: deleteGroupstUrl + id,
            type: 'DELETE',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", UUMAToken);
            },
            success: function(json){
                const status = json.status*1 || 0;
                if(200 == status){
                    delOneGroup(id);

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
            }, {
                title: "组名",
                dataIndex: 'name',

            }, {
                title: "描述",
                dataIndex: 'description',
            },  {
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

    //表数据处理
    getDatas(){
        const { groupList } = this.props;
        let orgData = groupList.data;
        let tableData = [];
        //遍历组，补充key和操作列
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
        const { openGroupModal } = this.props;
        openGroupModal(orgData)
    }

    //点击删除处理事件
    onClickDel(id, name){
        //触发打开用户模块方法
        const _this = this;
        //根据ID获取用户信息
        Modal.confirm({
            title: "确认删除组"+ name +"?",
            maskClosable: true,
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                _this.sendDeleteAjax(id);
            }
        })
    }

    render(){
        const {  groupList, openGroupModal, updateGroupSearch } = this.props;
        return(
            <div className="table_container">
                <Row span={24} className="table_nav">
                    <Col span={10}>
                        <span  className="table_title">组列表</span>
                    </Col>
                    <Col span={14}>
                        <Col span={7} push={16}>
                            <Search
                                placeholder="自定义搜索"
                                style={{ width:210 }}
                                onSearch={value => updateGroupSearch(value)}
                            />
                        </Col>
                        <Col span={2} push={15}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    openGroupModal({})
                                }
                                }>
                                添加组
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
                        loading={groupList.loading}
                        columns={this.getColumns()}
                        dataSource={this.getDatas()}
                    />
                </Row>
                <GroupModalContainer></GroupModalContainer>
            </div>
        )
    }
}

export default groupsList;
