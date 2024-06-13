import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import RecipeIconComponent from "@/app/components/LoadingSpinner/RecipeIconComponent";

export default function SearchLoading() {
	return (
		<>
			<section
				style={{
					position: "fixed",
					top: "0%",
					display: "grid",
					placeItems: "center",
					width: "100dvw",
					height: "100dvh",
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
