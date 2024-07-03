export function calcSingular(strg) {
	const fragment = strg.slice(-3);
	if (fragment === "ies") {
		return `${strg.slice(0, -3)}y`;
	} else if (fragment === "ves") {
		return `${strg.slice(0, -3)}f`;
	} else if (fragment === "oes") {
		return `${strg.slice(0, -3)}o`;
	} else {
		return `${strg.slice(0, -1)}`;
	}
}
