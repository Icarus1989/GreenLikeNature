import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import RecipeIconComponent from "@/app/components/LoadingSpinner/RecipeIconComponent";

export default function SearchLoading() {
	return (
		<>
			<section
				style={{
					position: "fixed",
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
