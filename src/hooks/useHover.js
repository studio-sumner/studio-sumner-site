import {useState} from 'react';
import isTouchEnabled from '../utils/isTouchEnabled';

const useHover = () => {
	const isTouch = isTouchEnabled();
	const [isHovering, setIsHovering] = useState(false);

	const onMouseEnter = () => {
		setIsHovering(true);
	};

	const onMouseLeave = () => {
		setIsHovering(false);
	};

	const hoverProps = isTouch ? {} : {onMouseEnter, onMouseLeave};

	return [isHovering, hoverProps];
};

export default useHover;
