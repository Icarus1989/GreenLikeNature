import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import RecipeIconComponent from "@/components/LoadingSpinner/RecipeIconComponent";

export default function SearchLoading() {
	return (
		<>
			<section
				style={{
					display: "grid",
					placeItems: "center",
					width: "100vw",
					height: "94dvh",
					background: "#2d2d2d",
					overflow: "hidden"
				}}
			>
				{/* ... */}
				<LoadingSpinner>
					<RecipeIconComponent />
				</LoadingSpinner>
			</section>
		</>
	);
}
