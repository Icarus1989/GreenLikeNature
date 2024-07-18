"use client";

import ErrorComponent from "@/app/components/ErrorComponent/ErrorComponent";

export default function GlobalError({ error, reset }) {
	return (
		<html>
			<body>
				<ErrorComponent error={error} reset={() => reset()} />
			</body>
		</html>
	);
}
