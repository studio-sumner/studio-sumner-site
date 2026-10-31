import React from 'react';
import Emoji from 'a11y-react-emoji';
import simpleTextBlock from '../utils/simpleTextBlock';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="✏️" />;

export default {
	name: 'simpleText',
	title: 'Simple Text',
	icon: Icon,
	type: 'array',
	of: [simpleTextBlock],
};
