import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import PlantIconComponent from "@/app/components/LoadingSpinner/PlantIconComponent";

export default function GeneralLoading() {
	return (
		<>
			<section
				style={{
					position: "fixed",
					display: "grid",
					placeItems: "center",
					width: "100dvw",
					height: "94dvh",
					background: "#2d2d2d",
					overflow: "hidden"
				}}
			>
				<LoadingSpinner>
					<PlantIconComponent />
				</LoadingSpinner>
			</section>
		</>
	);
}
