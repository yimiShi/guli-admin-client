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
		categoryName: PropTypes.string,
	}

	componentWillMount() {
		this.props.setForm(this.props.form)
	}

	render() {
		const { getFieldDecorator } = this.props.form

		const { categoryName } = this.props
		return (
			<Form>
				<Item>
					{getFieldDecorator('categoryName', {
						initialValue: categoryName || '',
						rules: [{ required: true, message: '分类名称不能为空' }],
					})(<Input type="text" placeholder="分类名称" />)}
				</Item>
			</Form>
		)
	}
}
export default Form.create()(AddUpdateForm)
