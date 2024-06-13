import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import PrefIconComponent from "@/app/components/LoadingSpinner/PreferIconComponent";

export default function SettingsLoading() {
	return (
		<>
			<section
				style={{
					position: "fixed",
					top: "0%",
					//
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
