import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import PrefIconComponent from "@/components/LoadingSpinner/PreferIconComponent";

export default function PreferencesLoading() {
	return (
		<>
			<section
				style={{
					display: "grid",
					placeItems: "center",
					width: "100vw",
					height: "100vh",
					background: "#2d2d2d",
					overflow: "hidden"
				}}
			>
				{/* ... */}
				<LoadingSpinner>
					<PrefIconComponent />
				</LoadingSpinner>
			</section>
		</>
	);
}
