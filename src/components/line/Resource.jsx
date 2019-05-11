import React, { Component } from "react";
import { Select, Button, Icon, Modal } from "antd";
import ResourceUpload from './ResourceUpload'
const Option = Select.Option;

export default class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: null,
            value: null
        }
    }
    buildOptions = () => {
        const { resources } = this.props;
        let options = new Array();
        options.push(resources.map(d =>
            <Option key={d.id} value={d.id}>
                {d.name}
            </Option>
        ))
        if (options.length == 0) return null;
        options.unshift(
            <Option key={'add'} onClick={() => console.log('click')}>
                上传
            </Option>)
        return options;
    }
    buildUploadForm = (key) => {
        this.upload = Modal.info({
            Icon: <Icon type='user' />,
            title: '上传语音文件',
            footer: {},
            content: <ResourceUpload resourceKey={key} done={this.done} />
        })
        return this.upload;
    }
    addOption = (v) => {

    }
    done = (v) => {
        this.upload && this.upload.destroy();
        let resources = this.props.resources || [];
        let value = this.props.value || v;
        resources = resources.map(r => { if (r.id === v.id) return v; return r; });
        this.setState({ resources: resources, value: value });
        this.props.done(v);
    }
    render() {
        const { mark, done } = this.props;
        const propResources = this.props.resources;
        const propValue = this.props.value;
        const stateResources = this.state.resources;
        const stateValue = this.state.value;
        const resources = stateResources || propResources || [];
        const value = stateValue || propValue || null;
        return resources && resources.length > 0
            ? (<Select value={value && value.id} onChange={(v) => done(v)}>
                {this.buildOptions()}
            </Select>)
            : (
                <Button block onClick={() => this.buildUploadForm(mark)} >
                    <Icon type="upload" />
                    上传
                </Button>
            )

    }
}