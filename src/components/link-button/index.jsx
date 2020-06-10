import React from 'react'

import './index.css'

/**
 * 自定义的看似链接实是button的组件
 * 1. {...props}, 将接收的所有属性传递给子标签
 * 2. children标签属性
 *  1. 字符串
 *  <LinkButton onClick={this.logout}>退出</LinkButton>
 *  2. 标签对象
 * <LinkButton onClick={this.logout}><span>退出</span></LinkButton>
 *  3. 标签对象的数组
 * <LinkButton onClick={this.logout}><span>退出</span><span>退出</span></LinkButton>
 * @param {} props
 */
export default function LinkButton(props) {
	// return <button {...props}></button>
	return <button {...props} className="link-button" />
}
