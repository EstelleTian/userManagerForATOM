import React from 'react'
import { Form, Input, Popover, Button, DatePicker, Tag } from 'antd';
import $ from 'jquery'
import { sendMultiFiltersUrl, parseFullTime } from '../../utils/requestUrls'
import './multiFilter.less'
const FormItem = Form.Item;

class MultiFilterForm extends React.Component {
    disabledStartDate = (startTime) => {
        const endTime = this.props.form.getFieldValue("endTime");
        if (!startTime || !endTime) {
            return false;
        }
        return startTime.valueOf() > endTime.valueOf();
    }

    disabledEndDate = (endTime) => {
        const startTime = this.props.form.getFieldValue("startTime");
        if (!endTime || !startTime) {
            return false;
        }
        return endTime.valueOf() <= startTime.valueOf();
    }

    onStartChange = (value) => {
        this.props.form.setFieldsValue({
            "startTime": value
        })
    }

    onEndChange = (value) => {
        this.props.form.setFieldsValue({
            "endTime": value
        })
    }

    resetForm = () => {
        this.props.form.resetFields();
        this.sendMultiRequest({}, false);
    }

    handleSubmit = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let start = values['startTime'] || "";
                if("" != start){
                    start = start.format('YYYYMMDDHHmmss')
                }
                let end = values['endTime'] || "";
                if("" != end){
                    end = end.format('YYYYMMDDHHmmss')
                }
                let username = values['username'] || "";
                let clientVersion = values['clientVersion'] || "";
                let ipAddress = values['ipAddress'] || "";
                let sendDatas = {
                    username,
                    clientVersion,
                    ipAddress,
                    startTime: start,
                    endTime: end
                }
                this.sendMultiRequest(sendDatas, true)

            }
        });
    }

    sendMultiRequest = ( datas, isClose ) => {
        const { updateUserList, updateMultiFilter, closeFilterPopover } = this.props;
        let sendValues = {
            username: "",
            clientVersion: "",
            ipAddress: "",
            startTime: "",
            endTime: "",
            ...datas
        }
        $.ajax({
            url: sendMultiFiltersUrl,
            data: sendValues,
            type: 'POST',
            dataType: 'json',
            success: (res) => {
                if("200" == res.status && res.hasOwnProperty("onLineUserResultList")){
                    const userList = res.onLineUserResultList || [];
                    updateUserList(userList);
                    updateMultiFilter(sendValues);
                    if(isClose){
                        closeFilterPopover();
                    }
                }
            },
            error: (err) => {
                console.error(err);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 7,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} className="filter_form">
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        // rules: [{
                        //     type: 'string', message: 'The input is not valid E-mail!',
                        // }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="客户端版本"
                    hasFeedback
                >
                    {getFieldDecorator('clientVersion', {

                    })(
                        <Input type="string" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="IP地址"
                    hasFeedback
                >
                    {getFieldDecorator('ipAddress', {

                    })(
                        <Input type="string" />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="登录开始时间"
                hasFeedback
            >
                {getFieldDecorator('startTime', {

                })(
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="格式YYYY-MM-DD HH:mm:ss"
                        onChange={this.onStartChange}
                        style={{width: '200px'}}
                    />
                )}
            </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="登录结束时间"
                    hasFeedback
                >
                    {getFieldDecorator('endTime', {

                    })(
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="格式YYYY-MM-DD HH:mm:ss"
                            onChange={this.onEndChange}
                            style={{width: '200px'}}
                        />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button type="ghost" className="m_l_10 clear_btn" onClick={this.resetForm}>清空</Button>
                    <Button type="ghost" className="m_l_10" onClick={this.props.closeFilterPopover}>关闭</Button>
                </FormItem>
            </Form>
        );
    }
}
MultiFilterForm = Form.create()(MultiFilterForm);

class MultiFilter extends React.Component{
    render(){
        const { updateUserList, toggleFilterPopover, updateMultiFilter, closeFilterPopover, filterPopover, multiFilterKey } = this.props;
        return (
            <div>
                <Popover
                    content={
                        <div>
                            <MultiFilterForm
                                updateUserList = {updateUserList}
                                closeFilterPopover = {closeFilterPopover}
                                updateMultiFilter = {updateMultiFilter}
                            />
                        </div>
                    }
                    title=""
                    trigger="click"
                    visible={filterPopover}
                >
                    <Button type="primary" icon="search" onClick={toggleFilterPopover}>多条件查询</Button>
                </Popover>
                <div className="tag_items">
                    {
                        multiFilterKey.username.trim() != "" ? <Tag>用户名：{multiFilterKey.username}</Tag> : ""
                    }
                    {
                        multiFilterKey.clientVersion.trim() != "" ? <Tag>客户端版本：{multiFilterKey.clientVersion}</Tag> : ""
                    }
                    {
                        multiFilterKey.ipAddress.trim() != "" ? <Tag>IP地址：{multiFilterKey.ipAddress}</Tag> : ""
                    }
                    {
                        multiFilterKey.startTime.trim() != "" ? <Tag>登录开始时间：{parseFullTime(multiFilterKey.startTime)}</Tag> : ""
                    }

                    {
                        multiFilterKey.endTime.trim() != "" ? <Tag>登录结束时间：{parseFullTime(multiFilterKey.endTime)}</Tag> : ""
                    }
                </div>
            </div>
        )
    }
}

export default MultiFilter;