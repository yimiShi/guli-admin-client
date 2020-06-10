import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'

import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddUpdateForm from './add-update-form'
/**
 * 分类管理
 */
export default class Category extends Component {
	state = {
		categorys: [],
		loading: false,
		showStatus: 0, // 对话框, 0不显示, 1显示添加, 2显示修改
	}

	initColumns = () => {
		this.columns = [
			{
				title: '分类名称',
				dataIndex: 'name',
			},
			{
				title: '操作',
				width: 300,
				render: (category) => (
					<LinkButton
						onClick={() => {
							this.category = category
							this.setState({ showStatus: 2 })
						}}
					>
						修改分类
					</LinkButton>
				),
			},
		]
	}

	getCategorys = async () => {
		// loading
		this.setState({ loading: true })
		const result = await reqCategorys()
		this.setState({ loading: false })

		if (result.status === 0) {
			const categorys = result.data
			this.setState({
				categorys,
			})
		} else {
			message.error('获取分类列表失败')
		}
	}

	/**
	 * 点击确定的回调, 去添加或者修改
	 */
	handleOk = () => {
		// 进行表单验证

		this.form.validateFields(async (err, values) => {
			if (!err) {
				this.form.resetFields() // 重置输入数据, 变成了初始值
				const { categoryName } = values

				const showStatus = this.state.showStatus

				let result
				if (showStatus === 1) {
					// 添加分类请求
					result = await reqAddCategory(categoryName)
				} else {
					// 修改分类
					const categoryId = this.category._id
					result = await reqUpdateCategory({ categoryId, categoryName })
				}

				this.setState({ showStatus: 0 })
				const action = showStatus === 1 ? '添加' : '修改'
				// 做不同的处理
				if (result.status === 0) {
					this.getCategorys()
					message.success(action + '分类成功')
				} else {
					message.error(action + '分类失败')
				}
			}
		})

		// 验证通过后, 得到数据
	}

	/**
	 * 点击取消的回调
	 */
	handleCancel = () => {
		this.form.resetFields()
		this.setState({ showStatus: 0 })
	}

	UNSAFE_componentWillMount() {
		this.initColumns()
	}

	componentDidMount() {
		this.getCategorys()
	}

	render() {
		const { categorys, loading, showStatus } = this.state

		// 读取更新的分类名称
		const category = this.category || {}

		//card 右上角结构
		const extra = (
			<Button
				type="primary"
				onClick={() => {
					this.setState({ showStatus: 1 })
				}}
			>
				<Icon type="plus" />
				添加
			</Button>
		)

		return (
			<Card extra={extra}>
				<Table
					rowKey="_id"
					columns={this.columns}
					dataSource={categorys}
					bordered={true}
					loading={loading}
					pagination={{ defaultPageSize: 7, showQuickJumper: true }}
				></Table>
				<Modal
					title={showStatus === 1 ? '添加分类' : '修改分类'}
					visible={showStatus !== 0}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<AddUpdateForm setForm={(form) => (this.form = form)} categoryName={category.name} />
				</Modal>
			</Card>
		)
	}
}
