import React, { Component } from 'react'
import { Card, Button, Icon, Table } from 'antd'

/**
 * 分类管理
 */
export default class Category extends Component {
	render() {
		//card 右上角结构
		const extra = (
			<Button type="primary">
				<Icon type="plus">添加</Icon>
			</Button>
		)
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				render: (text) => <a>{text}</a>,
			},
			{
				title: 'Cash Assets',
				className: 'column-money',
				dataIndex: 'money',
			},
			{
				title: 'Address',
				dataIndex: 'address',
			},
		]

		const data = [
			{
				key: '1',
				name: 'John Brown',
				money: '￥300,000.00',
				address: 'New York No. 1 Lake Park',
			},
			{
				key: '2',
				name: 'Jim Green',
				money: '￥1,256,000.00',
				address: 'London No. 1 Lake Park',
			},
			{
				key: '3',
				name: 'Joe Black',
				money: '￥120,000.00',
				address: 'Sidney No. 1 Lake Park',
			},
		]
		return (
			<Card extra={extra}>
				<Table
					columns={columns}
					dataSource={data}
					bordered={true}
					pagination={{ defaultPageSize: 2, showQuickJumper: 'true' }}
				></Table>
			</Card>
		)
	}
}
