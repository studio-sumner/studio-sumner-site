import {useState} from 'react';
import {useIntersectionObserverRef} from 'rooks';

const useVisible = ({...intersectionObserverConfig}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [hasSeen, setHasSeen] = useState(false);

	const callback = entries => {
		let isIntersecting = false;

		if (entries && entries[0]) {
			isIntersecting = entries[0].isIntersecting;
		}

		setIsVisible(isIntersecting);

		if (isIntersecting) {
			setHasSeen(true);
		}
	};

	const [ref] = useIntersectionObserverRef(
		callback,
		intersectionObserverConfig,
	);

	return {
		ref,
		isVisible,
		hasSeen,
	};
};

export default useVisible;
