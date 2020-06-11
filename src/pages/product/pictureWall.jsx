import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteImg } from '../../api'

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export default class PicturesWall extends React.Component {
	state = {
		previewVisible: false,
		previewImage: '',
		fileList: [
			// {
			// 	uid: '-1',
			// 	name: 'image.png',
			// 	status: 'done',
			// 	url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			// },
		],
	}

	/**
	 * 获取所有已上传图片文件名的数组
	 */
	getImgs = () => this.state.fileList.map((file) => file.name)

	handleCancel = () => this.setState({ previewVisible: false })

	handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		})
	}

	handleChange = async ({ file, fileList }) => {
		// file和fileList中最后一个file代表同个图片的不同对象
		if (file.status === 'done') {
			file = fileList[fileList.length - 1]
			const { name, url } = file.response.data
			file.name = name
			file.url = url
		} else if (file.statue === 'remove') {
			// 删除图片
			const result = await reqDeleteImg(file.name)
			if (result.status === 0) {
				message.success('图片删除成功')
			} else {
				message.error('图片删除失败')
			}
		}

		this.setState({ fileList })
	}

	render() {
		const { previewVisible, previewImage, fileList } = this.state
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		)
		return (
			<div className="clearfix">
				<Upload
					action="/manage/img/upload" //上传路径
					name="image" // 图片文件对应的参数名
					listType="picture-card" // 显示风格
					// listType="picture" // 显示风格
					fileList={fileList} //初始显示的文件列表
					onPreview={this.handlePreview}
					onChange={this.handleChange}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		)
	}
}
