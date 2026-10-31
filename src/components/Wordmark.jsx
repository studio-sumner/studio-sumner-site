import React, {useEffect, useState} from 'react';

const FONT = '700 100px "Lexend Mega Variable"';

// Lexend Mega bold capitals, measured from first to last stroke, with the space the font leaves either
// side, all in em. These seed the server render for the default text; other text is measured in the browser.
const MEASURED = {
	SUMNER: {width: 5.469, left: 0.0701, right: 0.0972},
	'STUDIO SUMNER': {width: 11.296, left: 0.0701, right: 0.0972},
};

const measure = text => {
	const context = document.createElement('canvas').getContext('2d');
	context.font = FONT;
	const metrics = context.measureText(text);
	const ink = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
	return {
		width: ink / 100,
		left: -metrics.actualBoundingBoxLeft / 100,
		right: (metrics.width - metrics.actualBoundingBoxRight) / 100,
	};
};

// The wordmark's letters span the margins. Its size is a share of the footer width (the footer is the
// container), and the em margins cancel the space the font leaves either side.
export default function Wordmark({text = '', className}) {
	const caps = text.toUpperCase();
	const [metrics, setMetrics] = useState(MEASURED[caps]);

	useEffect(() => {
		let cancelled = false;
		document.fonts.load(FONT, caps).then(() => {
			if (!cancelled) setMetrics(measure(caps));
		});
		return () => {
			cancelled = true;
		};
	}, [caps]);

	const style = metrics
		? {
				fontSize: `${100 / metrics.width}cqi`,
				marginLeft: `${-metrics.left}em`,
				marginRight: `${-metrics.right}em`,
			}
		: {visibility: 'hidden'};

	return (
		<span className={className} style={style}>
			{text}
		</span>
	);
}
