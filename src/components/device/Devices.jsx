import React,{Component} from 'react';
import { Table,Input, Button } from 'antd';
import {fetchOrgs} from '../../redux/org/orgActions';
import { connect } from '../../connect'
import { Link } from 'react-router-dom';
import BreadcrumbCustom from '../BreadcrumbCustom';

class Devices extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const columns=[{
            title: '设备ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
            render: text => <span>{text}</span>,
        },{
            title: '设备型号',
            dataIndex: 'model',
            key: 'model',
            render: text => <span>{text}</span>,
        },{
            title: '注册时间',
            dataIndex: 'created',
            key: 'created',
            render: text => <span>{text}</span>,
        },{
            title: '车辆',
            dataIndex: 'traffic',
            key: 'traffic',
            render: text => <span>{text}</span>,
        },{
            title: '线路',
            dataIndex: 'routes',
            key: 'routes',
            render: text => <span>{text.length}</span>,
        },{
            title: '当前线路',
            dataIndex: 'routes',
            key: 'routes',
            render: text => <span>{text}</span>,
        },{
            title: '路牌数量',
            dataIndex: 'signs',
            key: 'signs',
            render: text => <span>{text.length}</span>,
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: text => <span>{text}</span>,
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
        
                    <Link to={`/app/org/accounts?org=${record.id}`}>账号管理</Link>
                    <Button onClick={()=>{
                    }}>编辑</Button>
                    <span className="ant-divider" />
                    <Button>Delete</Button>
                    <span className="ant-divider" />
                </span>
            ),
        }];
        const devices=[
            {
                deviceId:'1',
                model:'a1',
                created:'121212',
                traffic:'粤B123123',
                routes:[],
                signs:[],
                status:'normal'
            }
        ]
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="设备"/>
                <p>
                    <Button>注册设备</Button>
                    <Button>导入设备</Button>
                </p>
                
                <Table columns={columns} dataSource={devices} />
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    // return {
    //     errorMsg: state.getIn(['orgReducer', 'errorMsg']),
    //     orgs: state.getIn(['orgReducer','orgs'],[]),
    //     fetching: state.getIn(['orgReducer','fetching'])
    // }
}


const mapDispatchToProps = (dispatch) => {
    // return {
    //     fetchOrgs: () => {
    //         dispatch(fetchOrgs())
    //     }
    // }
}
export default connect(mapStateToProps, mapDispatchToProps)(Devices)