import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'

const Item = Form.Item

/**
 * 添加分类的form组件
 */
class AddUpdateForm extends Component {
	static propTypes = {
		setForm: PropTypes.func.isRequired,
	}

	componentWillMount() {
		console.log(this.props.form.getFieldValue('categoryName'))

		this.props.setForm(this.props.form)
	}

	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form>
				<Item>
					{getFieldDecorator('categoryName', {
						initialValue: '',
						rules: [{ required: true, message: '分类名称不能为空' }],
					})(<Input type="text" placeholder="分类名称"></Input>)}
				</Item>
			</Form>
		)
	}
}
export default Form.create()(AddUpdateForm)
