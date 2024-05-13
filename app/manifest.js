export default function manifest() {
	return {
		name: "Green Like Nature",
		short_name: "GreenLikeNature",
		description: "A Next.js - React.js App made for Start2impact React Course",
		start_url: "/",
		display: "standalone",
		background_color: "#000",
		theme_color: "#000",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon"
			}
		]
	};
}
