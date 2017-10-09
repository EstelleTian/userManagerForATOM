import React from 'react'
import $ from 'jquery'
import {Row, Col, Button, Modal, Input} from 'antd'
import MultiFilter from '../multiFilter'
import { getUserListUrl, sendLogoutUrl } from '../../utils/requestUrls'
import './filterContent.less'

const Search = Input.Search;

class FilterContent extends React.Component{
    retrieveUserList = () =>{
        const { updateUserList, updateMultiFilter } = this.props;
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
                updateMultiFilter({});
                $(".clear_btn").trigger('click');
            },
            error: function(err){
                console.error(err);
            }
        })
    }

    onClickMultiLogout = (e) => {
        const { forceLogout, userList } = this.props;
        let tokens = [];
        let names = [];
        userList.map( user => {
            if(user.isActived){
                tokens.push(user.token);
                names.push(user.user.username);
            }
        })
        const tokensStr = tokens.join(',');
        const namesStr = names.join(',');
        if(tokensStr.length > 0){
            Modal.confirm({
                title: '确定批量退出用户'+namesStr+'?',
                onOk(){
                    $.ajax({
                        url: sendLogoutUrl,
                        data: "tokens=" + tokensStr,
                        type: 'post',
                        dataType: 'json',
                        success: function(json){
                            if(json.hasOwnProperty("error") || json.status*1 == 500){
                                let msg = json.error.message || "";
                                const tokenArr = msg.split(",");
                                let invalidNames = [];
                                for(let i=0,len=tokenArr.length; i<len; i++){
                                    const token = tokenArr[i];
                                    const index = tokens.indexOf(token);
                                    if(index > -1){
                                        invalidNames.push(names[index]);
                                    }
                                }
                                const invalidNamesStr = invalidNames.join(",");
                                Modal.warn({
                                    title: "批量退出用户"+invalidNamesStr+"失败，因用户不存在。其余用户刷新成功！"
                                })
                            }else if( json.status*1 == 200 ){
                                Modal.success({
                                    title: "批量退出用户"+namesStr+"成功"
                                })
                                forceLogout(tokens);
                            }
                        },
                        error: function(err){
                            console.error(err);
                        }
                    })

                }
            });
        }else{
            Modal.warn({
                title: '请选择要退出的用户?'
            });
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render(){
        const { filterList, updateUserList, updateMultiFilter, toggleFilterPopover, closeFilterPopover, filterPopover, multiFilterKey } = this.props;
        return(
            <Row className="filter_container">
                <Col span={4}>
                    <Search
                        className="us_search"
                        placeholder="自定义查询"
                        size="large"
                        onSearch={(inputVal) => {
                            filterList(inputVal);
                        }}
                        onKeyUp={() => {
                            const inputVal = $(".us_search>input").val();
                            filterList(inputVal);
                        }}
                    />
                </Col>
                <Col lg={1} md={2} xs={3} className="opt_btn">
                    <Button type="primary" onClick={this.retrieveUserList}>刷新列表</Button>
                </Col>
                <Col lg={1} md={2} xs={3} className="opt_btn">
                    <Button type="primary" onClick={this.onClickMultiLogout}>批量退出</Button>
                </Col>
                <Col lg={14} md={14} xs={12} className="opt_btn">
                    <MultiFilter
                        updateUserList={updateUserList}
                        toggleFilterPopover={toggleFilterPopover}
                        closeFilterPopover={closeFilterPopover}
                        filterPopover = {filterPopover}
                        updateMultiFilter = {updateMultiFilter}
                        multiFilterKey = {multiFilterKey}
                    />
                </Col>
            </Row>
        )
    }
}

export default FilterContent;
