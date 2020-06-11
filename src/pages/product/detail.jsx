import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Buttom, Card, Icon, List } from 'antd'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { BASE_IMG } from '../../utils/Constants'
import { reqCategory } from '../../api'

export default class Detail extends Component {
	state = {
		categoryName: '',
	}
	getCategory = async (categoryId) => {
		const result = await reqCategory(categoryId)
		if (result.status === 0) {
			const categoryName = result.name
			this.setState({ categoryName })
		}
	}

	componentDidMount() {
		const product = memoryUtils.product
		this.getCategory(product.categoryId)
	}

	render() {
		const product = memoryUtils.product
		const { categoryName } = this.state

		if (!product || !product._id) {
			return <Redirect to="/product" />
		}

		const title = (
			<span>
				<LinkButton onClick={() => this.props.history.goBack()}>
					<Icon type="arrow-left" />
				</LinkButton>
				<span>商品详情</span>
			</span>
		)
		return (
			<Card title={title} className="detail">
				<List>
					<List.Item>
						<span className="detail-left">商品名称:</span>
						<span>{product.name}</span>
					</List.Item>
					<List.Item>
						<span className="detail-left">商品描述:</span>
						<span>{product.desc}</span>
					</List.Item>
					<List.Item>
						<span className="detail-left">商品价格:</span>
						<span>{product.price}</span>
					</List.Item>
					<List.Item>
						<span className="detail-left">所属分类:</span>
						<span>{categoryName}</span>
					</List.Item>
					<List.Item>
						<span className="detail-left">商品图片:</span>
						<span>
							{product.imgs.map((img, item) => {
								return <img key={img} src={BASE_IMG + img} alt={img} />
							})}
						</span>
					</List.Item>
					<List.Item>
						<span className="detail-left">商品详情:</span>
						<div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
					</List.Item>
				</List>
			</Card>
		)
	}
}
