import React, { Component } from "react";
import { Select, Button, Icon, Modal } from "antd";
import ResourceUpload from './ResourceUpload'
const Option = Select.Option;

export default class Resource extends Component {
    constructor(props) {
        super(props);
    }
    buildOptions = () => {
        const { resources } = this.props;
        let options = new Array();
        options.push(
            <Option key={'add'} onClick={() => console.log('click')}>
                上传
            </Option>
        )
        options.push(resources.map(d =>
            <Option key={d.name} value={d.id}>
                {d.name}
            </Option>
        ));
        return options;
    }
    buildUploadForm = (key) => {
        return Modal.info({
            Icon: null,
            title: '上传语音文件',
            content: <ResourceUpload resourceKey={key} />
        })
    }
    render() {
        const { resources, value, key } = this.props;
        return resources
            ? (<Select defaultValue={value && value.id}>
                {this.buildOptions()}
            </Select>)
            : (
                <Button block onClick={() => this.buildUploadForm(key)} >
                    <Icon type="upload" />
                    上传
                </Button>
            )

    }
}