import React from 'react';
import Head from './Head';

import Article from './Article';
import Nav from './Nav';
import css from 'next/css';
import * as utils from '../static/utils.js';

const articleList = css({
  background: '#FAFAFA'
});

const articleCard = css({
  background: '#FFF',
  boxShadow: '0 1px 4px rgba(0,0,0,.04)',
  margin: '1em 0',
  padding: '1em'
});

class Feed extends React.Component {
	constructor(props) {
		super(props);

		this._getPosts = this._getPosts.bind(this);
		this._createMarkup = this._createMarkup.bind(this);

		this.state = {
			_articles: []
		};
	}

	componentDidMount() {
		this.setState(
			{
				_articles: this._getPosts()
			}
		);
	}

	_createMarkup(html) {
		return {
			__html: html
		};
	}

	_getPosts() {
		var instance = this;

		var data = WeDeploy.data('http://data.weblog-test.wedeploy.io');

		data.get('posts')
			.then(function(posts) {
				instance.setState(
					{
						_articles: posts
					}
				);

			}
		);
	}

	render() {
		const createMarkup = this._createMarkup;

		return (
			<div {...css(articleList, utils.standardPadding)}>
				<div className="container">
					{
						this.state._articles.map(
							article => (<Article article={article} key={article.id} />)
						)
					}
				</div>
			</div>
		);
	}
}

export default Feed;
