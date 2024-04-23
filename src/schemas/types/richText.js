import React from 'react';
import Emoji from 'a11y-react-emoji';
import textBlock from '../utils/textBlock';
import tableBlock from '../utils/tableBlock';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📝" />;

const imageBlock = {type: 'image'};

export default {
	name: 'richText',
	title: 'Rich Text',
	icon: Icon,
	type: 'array',
	of: [textBlock, tableBlock, imageBlock],
};
