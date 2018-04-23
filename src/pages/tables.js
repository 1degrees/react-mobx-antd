
import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

@inject('tableStore') @observer
class Tables extends Component {
    static propsType = {
        detailStore: {
            listData : PropTypes.array.isRequired,
            getTableData : PropTypes.func.isRequired
        }
    }
    
    loadData = () => {
        this.props.tableStore.getTableData();
    }

    componentWillMount(){
        this.loadData();
    }

    onRow = (record,index) => {
        return {
            onClick: () => { 
                this.props.history.push({ pathname: `/detail/${record.order_id}`, state: {} });
            },
        };
    }
    render() {
        let { listData } = this.props.tableStore
        let columns = [ {
            title: '订单号',
            dataIndex: 'order_no',
            key: 'order_no',
        }, {
            title: '交易类型',
            dataIndex: 'category_name',
            key: 'category_name',
        }, {
            title: '服务类型',
            dataIndex: 'serve_types_name',
            key: 'serve_types_name',
        }, {
            title: '交易状态',
            dataIndex: 'orderStatusZn',
            key: 'orderStatusZn',
        }, {
            title: '服务地址',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <Table pagination={{'pageSize':8}} onRow= {this.onRow} className={'table-list'} rowKey="order_no" dataSource={[...listData]} columns={columns} />
        );
    }
}

export default Tables;