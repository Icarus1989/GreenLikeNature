export default function singleRecipeReducer(state, action) {
	if (action.type === "change") {
		const value = action.target.checked;
		const name = action.target.name;
		const category = name.split("-")[0];
		const detail = category === "ingredient" ? name.split("-")[1] : name;
		const key = `${category}s`;
		return {
			...state,
			[key]: state[key].map((field) => {
				if (Object.keys(field)[0] === detail) {
					return { [detail]: value };
				} else {
					return field;
				}
			})
		};
	} else if (action.type === "completed") {
		return {
			ingredients: state.ingredients.map((ingredient) => {
				const key = Object.keys(ingredient)[0];
				return { [key]: action.value };
			}),
			steps: state.steps.map((step) => {
				const key = Object.keys(step)[0];
				return { [key]: action.value };
			}),
			complete: {
				confirm: action.value,
				timestamp: action.text
			}
		};
	} else {
		throw Error("Unknown action: " + action.type);
	}
}
