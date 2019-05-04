import React, { Component } from 'react';
import { Spin, Form, Icon, Input, Button, Upload } from 'antd';
import { connect } from '../../connect'
import { upload } from '../../redux/resource/resActions';


const FormItem = Form.Item;

class ResourceUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            official: null,
            locality: null,
            english: null,
        }
    }

    upload = () => {
        const { orgId, resourceKey } = this.props;
        debugger;
        let data = new FormData();
        if (this.state.official) {
            data.append('official', this.state.official)
        }
        if (this.state.locality) {
            data.append('locality', this.state.locality)
        }
        if (this.state.english) {
            data.append('english', this.state.english)
        }
        data.append('name', this.state.name);
        this.props.upload(data, orgId, resourceKey);
    }
    _handleUploadChange = (prop) => (input) => {
        this.setState({ [prop]: input.file })
    }
    _handleInputChange = (prop) => (input) => {
        this.setState({ [prop]: input.target.value })
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        const uploadProp = {
            withCredentials: true,
            accept: '.jpg',
            name: 'file',
            beforeUpload: () => { return false; }
        }
        return (
            <Spin spinning={this.props.uploading}>
                <Form layout="horizontal">
                    <FormItem label="资源名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入资源名称!' }],
                        })(
                            <Input size="large"
                                onChange={this._handleInputChange('name')} />
                        )}
                    </FormItem>
                    <FormItem label="官方语">
                        {getFieldDecorator('file1')(
                            <Upload
                                {...uploadProp}
                                onChange={this._handleUploadChange('official')} >
                                <Button size="large">
                                    <Icon type="upload" /> 选择
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem label="地方语">
                        {getFieldDecorator('file2')(
                            <Upload
                                {...uploadProp}
                                onChange={this._handleUploadChange('locality')} >
                                <Button size="large">
                                    <Icon type="upload" /> 选择
                                </Button>
                            </Upload>)}
                    </FormItem>
                    <FormItem label="英语">
                        {getFieldDecorator('file3')(
                            <Upload
                                {...uploadProp}
                                onChange={this._handleUploadChange('english')} >
                                <Button size="large">
                                    <Icon type="upload" /> 选择
                                </Button>
                            </Upload>)}
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.upload}>
                            <Icon type="upload" />
                            上传
                        </Button>
                    </FormItem>
                </Form>
            </Spin>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.getIn(['resourceReducer', 'errorMsg']),
        uploading: state.getIn(['resourceReducer', 'fetching'])
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        upload: (formData, orgId, key) => {
            dispatch(upload(formData, orgId, key))
        }
    }
}
const uploadForm = Form.create()(ResourceUpload)
export default connect(mapStateToProps, mapDispatchToProps)(uploadForm)