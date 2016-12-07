import React from 'react';
import Head from './Head';
import Nav from './Nav';
import css from 'next/css';
import * as utils from '../static/utils.js';

const articleCard = css(
	{
		background: '#FFF',
		boxShadow: '0 1px 4px rgba(0,0,0,.04)',
		margin: '1em 0',
		padding: '1em'
	}
);

class Article extends React.Component {
	constructor(props) {
		super(props);

		this._createMarkup = this._createMarkup.bind(this);
	}

	_createMarkup(html) {
		return {
			__html: html
		};
	}

	render() {
		const {
			contentHTML,
			createDate,
			id,
			title,
			userName
		} = this.props.article;

		const time = new Date(createDate);

		return (
			<article className={articleCard}>
				<h5>{title}</h5>

				<p dangerouslySetInnerHTML={this._createMarkup(contentHTML)}></p>

				{createDate &&
					<div>created by {userName} on {time.toString()}</div>
				}

				<a href="/post" className={utils.smallFont}>Read More</a>
			</article>
		);
	}
}

export default Article;
