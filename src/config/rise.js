// Sections rise in on load, 80ms apart: header, then each page component, then the footer.
export const RISE_STEP = 80;

export const riseClassName = 'animate-rise motion-reduce:animate-none';

export const riseStyle = step => ({animationDelay: `${step * RISE_STEP}ms`});
