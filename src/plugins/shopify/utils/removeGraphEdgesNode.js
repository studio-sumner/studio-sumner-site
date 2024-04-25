const mapValues = require('lodash/mapValues');
const isArray = require('lodash/isArray');
const isObject = require('lodash/isObject');

export default function removeGraphEdgesNode(res) {
	if (isArray(res)) {
		return res.map(v => removeGraphEdgesNode(v));
	} else if (isObject(res)) {
		if (res.edges) {
			return removeGraphEdgesNode(res.edges);
		} else if (res.node) {
			return removeGraphEdgesNode(res.node);
		} else {
			return mapValues(res, removeGraphEdgesNode);
		}
	} else {
		return res;
	}
}
