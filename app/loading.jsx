import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import PlantIconComponent from "@/components/LoadingSpinner/PlantIconComponent";

export default function GeneralLoading() {
	return (
		<>
			<section
				style={{
					display: "grid",
					placeItems: "center",
					width: "100vw",
					height: "100vh",
					// background: "linear-gradient(45deg, #06590696, #191b19)"
					background: "#2d2d2d",
					overflow: "hidden"
				}}
			>
				{/* ... */}
				<LoadingSpinner>
					<PlantIconComponent />
				</LoadingSpinner>
				{/* Loading Spinner Component */}
				{/* Qui bkg parzialmente transparent */}
			</section>
		</>
	);
}
