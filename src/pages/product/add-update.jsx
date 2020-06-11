import React, { Component } from 'react'
import { Card, Icon, Button, Form, Input, Select } from 'antd'

import { reqCategorys } from '../../api'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'

const Option = Select.Option

class ProductAddUpdate extends Component {
	state = {
		categorys: [],
	}
	getCategorys = async () => {
		const result = await reqCategorys()
		if (result.status === 0) {
			const categorys = result.data
			this.setState({ categorys })
		}
	}

	/**
	 * 价格验证
	 */
	validatePrice = (rule, value, callback) => {
		if (value <= 0) {
			callback('价格必须大于0')
		} else {
			callback()
		}
	}

	handleSubmit = (event) => {
		console.log(111)

		event.preventDefault()
		this.props.form.validateFields(async (err, values) => {
			console.log(err)

			if (!err) {
				const { name, desc, price, categoryId } = values
				console.log('发送请求:', name, desc, price, categoryId)
			}
		})
	}
	UNSAFE_componentWillMount() {
		this.product = memoryUtils.product
		this.isUpdate = !!this.product._id
	}

	componentDidMount() {
		this.getCategorys()
	}

	render() {
		const { categorys } = this.state
		const { product, isUpdate } = this

		const { getFieldDecorator } = this.props.form

		const title = (
			<span>
				<LinkButton onClick={() => this.props.history.goBack()}>
					<Icon type="arrow-left" />
				</LinkButton>
				<span>{isUpdate ? '修改' : '添加'}商品</span>
			</span>
		)

		const formLayout = {
			labelCol: { span: 2 },
			wrapperCol: { span: 8 },
		}

		return (
			<Card title={title}>
				<Form onSubmit={this.handleSubmit} {...formLayout}>
					<Form.Item label="商品名称">
						{getFieldDecorator('name', {
							initialValue: product.name,
							rules: [{ required: true, message: '商品名称不能为空!' }],
						})(<Input placeholder="请输入商品名称" />)}
					</Form.Item>
					<Form.Item label="商品描述">
						{getFieldDecorator('desc', {
							initialValue: product.price,
							rules: [{ required: true, message: '商品描述不能为空!' }],
						})(<Input placeholder="请输入商品描述" />)}
					</Form.Item>
					<Form.Item label="商品价格">
						{getFieldDecorator('price', {
							initialValue: product.price,
							rules: [
								{ required: true, message: '商品价格不能为空!' },
								{ validator: this.validatePrice },
							],
						})(<Input type="number" placeholder="请输入商品价格" addonAfter="元" />)}
					</Form.Item>
					<Form.Item label="商品分类">
						{getFieldDecorator('categoryId', {
							initialValue: product.categoryId || '',
							rules: [{ required: true, message: '商品分类不能为空!' }],
						})(
							<Select>
								<Option value="">未选择</Option>
								{categorys.map((item) => (
									<Option key={item._id} value={item._id}>
										{item.name}
									</Option>
								))}
							</Select>
						)}
					</Form.Item>
					<Form.Item label="商品图片">
						<div>商品图片组件</div>
					</Form.Item>
					<Form.Item label="商品详情">
						<div>商品详情组件</div>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
				</Form>
			</Card>
		)
	}
}

export default Form.create()(ProductAddUpdate)
