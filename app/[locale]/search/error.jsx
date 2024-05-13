"use client";

import ErrorComponent from "@/app/components/ErrorComponent/ErrorComponent";

export default function SearchError({ error, reset }) {
	return (
		<section>
			<ErrorComponent error={error} reset={() => reset()} value="Search" />
		</section>
	);
}
