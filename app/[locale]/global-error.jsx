"use client";

import { useEffect } from "react";
import ErrorComponent from "@/app/components/ErrorComponent/ErrorComponent";

export default function GlobalError({ error, reset }) {
	// useEffect(() => {
	// 	console.error(error);
	// }, [error]);
	return (
		<html>
			<body>
				<ErrorComponent error={error} reset={() => reset()} />
			</body>
		</html>
	);
}
