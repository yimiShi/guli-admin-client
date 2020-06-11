import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
import throttle from 'lodash.throttle'

import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/Constants'
import memoryUtils from '../../utils/memoryUtils'
const Option = Select.Option

/**
 * 商品管理
 */
export default class Product extends Component {
	state = {
		loading: false,
		products: [],
		total: 0, //商品总数量
		searchType: 'productName',
		searchName: '',
	}

	updateStatus = throttle(async (productId, status) => {
		status = status === 1 ? 2 : 1
		const result = await reqUpdateStatus(productId, status)

		if (result.status === 0) {
			message.success('更新商品状态成功')
			this.getProducts(this.pageNum)
		}
	}, 2000)

	initColumns = () => {
		this.columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				render: (price) => '￥' + price,
			},
			{
				title: '状态',
				width: 80,
				// dataIndex: 'status',
				render: ({ status, _id }) => {
					let btnText = '下架'
					let text = '在售'
					if (status === 2) {
						btnText = '上架'
						text = '已下架'
					}
					return (
						<span>
							<Button
								type="primary"
								onClick={() => {
									this.updateStatus(_id, status)
								}}
							>
								{btnText}
							</Button>
							<span>{text}</span>
						</span>
					)
				},
			},
			{
				title: '操作',
				render: (product) => (
					<span>
						<LinkButton>详情</LinkButton>
						<LinkButton
							onClick={() => {
								// 在内存中保存product
								memoryUtils.product = product
								this.props.history.push('/product/detail')
							}}
						>
							修改
						</LinkButton>
					</span>
				),
			},
		]
	}

	/**
	 * 异步获取指定页码的商品列表
	 */
	getProducts = async (pageNum) => {
		//保存当前页面
		this.pageNum = pageNum
		const { searchName, searchType } = this.state

		let result
		if (!this.isSearch) {
			result = await reqProducts(pageNum, PAGE_SIZE)
		} else {
			result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
		}

		if (result.status === 0) {
			const { total, list } = result.data
			this.setState({ total, products: list })
		}
	}

	UNSAFE_componentWillMount() {
		this.initColumns()
	}

	componentDidMount() {
		// 获取第一页显示
		this.getProducts(1)
	}

	render() {
		const { loading, total, products, searchType, searchName } = this.state

		const title = (
			<span>
				<Select
					style={{ width: 150 }}
					value={searchType}
					onChange={(value) => this.setState({ searchType: value })}
				>
					<Option value="productName">按名称搜索</Option>
					<Option value="productDesc">按描述搜索</Option>
				</Select>
				<Input
					style={{ width: 150, margin: '0 10px' }}
					placeholder="输入关键字"
					value={searchName}
					onChange={(event) => this.setState({ searchName: event.target.value })}
				/>
				<Button
					type="primary"
					onClick={() => {
						this.isSearch = true
						this.getProducts(1)
					}}
				>
					搜索
				</Button>
			</span>
		)

		const extra = (
			<Button
				type="primary"
				onClick={() => {
					memoryUtils.product = {}
					this.props.history.push('/product/addUpdate')
				}}
			>
				<Icon type="plus" />
				添加商品
			</Button>
		)

		return (
			<Card title={title} extra={extra}>
				<Table
					rowKey="_id"
					columns={this.columns}
					dataSource={products}
					bordered={true}
					loading={loading}
					pagination={{
						total,
						defaultPageSize: PAGE_SIZE,
						showQuickJumper: true,
						onChange: this.getProducts,
						current: this.pageNum,
					}}
				></Table>
			</Card>
		)
	}
}
