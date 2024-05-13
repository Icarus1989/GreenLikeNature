"use client";

import ErrorComponent from "@/app/components/ErrorComponent/ErrorComponent";

export default function SettingsError({ error, reset }) {
	return (
		<section>
			<ErrorComponent error={error} reset={() => reset()} value="Profile" />
		</section>
	);
}
