import React from 'react';
import {LazyMotion} from 'framer-motion';
import features from '../config/framerFeatures';

export default function FramerMotionConfig({children}) {
	return (
		<LazyMotion features={features} strict>
			{children}
		</LazyMotion>
	);
}
