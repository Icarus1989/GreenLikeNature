"use client";

import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";

export default function GlobalError({ error, reset }) {
	return (
		<html>
			<body>
				<ErrorComponent error={error} reset={reset} />
				{/* <h2>Something went wrong</h2>
				<button onClick={() => reset()}></button> */}
			</body>
		</html>
	);
}
