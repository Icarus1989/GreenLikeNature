import SingleRecipe from "@/components/SingleRecipe/SingleRecipe";

async function getData(id) {
	const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=1330da99e91849ae86b3e94990dd9365
`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch Failed");
	}
	return response.json();
}

export default async function Recipe({ params }) {
	const data = await getData(params.id);
	console.log(data);
	return (
		<main>
			{/* <h1>Recipe with ID: {params.id}</h1> */}
			{<SingleRecipe data={data} />}
		</main>
	);
}
