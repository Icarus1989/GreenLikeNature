/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "spoonacular.com",
				port: "",
				pathname: "/recipeImages/**"
			},
			{
				protocol: "https",
				hostname: "img.spoonacular.com",
				port: "",
				pathname: "/recipes/**"
			}
		]
	}
};

module.exports = nextConfig;
