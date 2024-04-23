export default function getAllPermutations(obj) {
	let combos = [{}];

	Object.entries(obj).forEach(([key, values]) => {
		let all = [];

		values.forEach(value => {
			combos.forEach(combo => {
				all.push({...combo, [key]: value});
			});
		});

		combos = all;
	});

	return combos;
}
