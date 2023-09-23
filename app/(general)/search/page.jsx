"use client";

import { useState } from "react";

export default function SearchPage() {
	const [text, setText] = useState("hello");
	// Here
	return (
		<section>
			<h2>Search Page</h2>
			<button onClick={() => setText(() => "jey")}>{text}</button>
		</section>
	);
}
