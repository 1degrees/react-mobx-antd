
import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Table, Card } from 'antd';
import PropTypes from 'prop-types';

@inject('detailStore') @observer
class Detail extends React.Component  {
    static propsType = {
        detailStore: {
            detailInfo : PropTypes.array.isRequired,
            getDetail : PropTypes.func.isRequired
        }
    }

    loadData(){
        this.props.detailStore.getDetail(this.props.match.params)
    }

    componentWillMount(){
        this.loadData();
    }

    render() {
        let { detailInfo } = this.props.detailStore
        let columns = [ {
            title: '订单号',
            dataIndex: 'master_id',
            key: 'master_id',
        }, {
            title: '商品图片',
            dataIndex: 'orderGoodsPhoto["src"][0]',
            key: 'orderGoodsPhoto["src"][0]',
            render : (text, record, index) => (<img width="80px" src={text}/>)
        }, {
            title: '商品类别',
            dataIndex: 'goods_info[0]["category_name"]',
            key: 'goods_info[0]["category_name"]',
        }, {
            title: '联系电话',
            dataIndex: 'master_phone',
            key: 'master_phone',
        }, {
            title: '交易人',
            dataIndex: 'master_name',
            key: 'master_name',
        }, {
            title: '交易状态',
            dataIndex: 'view["order_status_zn"]',
            key: 'view["order_status_zn"]',
        }];
        return (
            <Card className={"detail-info"} title="订单详情" bordered={false}>
                <Table rowKey="master_id" pagination={false} dataSource={[...detailInfo]} columns={columns} />
            </Card>
        );
    }
}

export default Detail;