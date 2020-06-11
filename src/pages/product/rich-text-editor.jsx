import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import lodash from 'lodash'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
	static propTypes = {
		detail: PropTypes.string,
	}

	state = {
		editorState: EditorState.createEmpty(),
	}

	onEditorStateChange = lodash.throttle((editorState) => this.setState({ editorState }), 500)

	getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

	uploadImageCallBack = (file) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open('POST', '/manage/img/upload')
			xhr.setRequestHeader('Authorization', 'Client-ID XXXXX')
			const data = new FormData()
			data.append('image', file)
			xhr.send(data)
			xhr.addEventListener('load', () => {
				const response = JSON.parse(xhr.responseText)
				resolve(response)
			})
			xhr.addEventListener('error', () => {
				const error = JSON.parse(xhr.responseText)
				reject(error)
			})
		})
	}

	componentWillMount() {
		const detail = this.props.detail
		if (detail) {
			// 生成一个editorState对象
			const contentBlock = htmlToDraft(detail)
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
			const editorState = EditorState.createWithContent(contentState)
			this.setState({ editorState })
		}
	}

	render() {
		const { editorState } = this.state
		return (
			<Editor
				editorState={editorState}
				editorStyle={{ height: 200, border: '1px solid black', paddingLeft: 10 }}
				onEditorStateChange={this.onEditorStateChange}
				toolbar={{
					image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
				}}
			/>
		)
	}
}
