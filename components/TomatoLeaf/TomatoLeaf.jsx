"use client";

import styles from "./TomatoLeaf.module.css";

export default function TomatoLeaf() {
	return (
		<>
			<svg
				viewBox="0 0 26 28"
				xmlns="http://www.w3.org/2000/svg"
				className={styles["tomato-leaf-svg"]}
			>
				<path
					style={{ stroke: "rgba(3, 64, 2, 0.95)", strokeWidth: "0.5px" }}
					fill="url(#leafGradient)"
					d="M 1.177 4.259 C 1.177 4.259 1.27 4.503 1.424 4.898 C 1.58 5.294 1.811 5.753 2.059 6.359 C 2.307 6.965 2.569 7.647 2.848 8.278 C 3.128 8.909 3.188 9.017 3.42 9.968 C 3.626 10.809 3.503 12.849 3.767 13.345 C 4.033 13.842 4.972 12.517 5.262 13.004 C 5.551 13.492 5.86 13.967 6.192 14.422 C 6.525 14.877 6.884 15.309 7.278 15.709 C 7.687 16.126 7.941 16.342 8.397 16.906 C 8.853 17.469 9.075 17.782 9.546 18.561 C 10.018 19.34 10.832 18.482 11.39 18.786 C 11.948 19.089 12.783 19.446 13.386 19.724 C 14.118 20.061 15.048 21.423 16.073 21.177 C 17.1 20.931 17.763 20.827 19.372 21.444 C 20.982 22.06 20.83 22.099 21.862 22.616 C 22.894 23.133 25.115 25.176 24.79 23.537 C 24.549 22.321 24.557 21.331 24.272 20.346 C 23.987 19.361 23.549 17.936 22.922 16.701 C 22.295 15.466 22.639 14.042 21.623 13.26 C 20.607 12.478 20.118 11.121 19.847 10.335 C 19.563 9.513 18.302 9.375 17.557 9.051 C 16.812 8.727 16.726 8.367 16.216 7.946 C 15.706 7.526 15.296 7.258 14.863 6.895 C 14.43 6.532 13.838 6.333 13.356 6.028 C 12.886 5.73 13.271 4.686 12.085 4.548 C 10.898 4.409 11.041 4.501 10.139 4.416 C 9.237 4.331 9.396 4.276 8.404 4.142 C 7.412 4.008 7.447 3.924 6.645 3.876 C 5.914 3.833 5.679 3.837 4.999 3.838 C 4.319 3.839 3.885 3.856 3.217 3.95 C 2.646 4.031 2.291 4.138 1.712 4.261 C 1.133 4.384 1.177 4.259 1.177 4.259"
					transform="matrix(1, 0, 0, 1, 8.881784197001252e-16, 0)"
				/>
				<defs>
					<radialGradient
						fx="-68%"
						fy="170%"
						cx="-68%"
						cy="170%"
						r="360%"
						id="leafGradient"
					>
						<stop offset="10%" stopColor="rgba(23, 230, 40, 1.0)" />
						<stop offset="30%" stopColor="rgba(23, 230, 40, 1.0)" />
						<stop offset="47%" stopColor="rgba(23, 95, 55, 1.0)" />
						<stop offset="48%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="49.9%" stopColor="rgb(3, 64, 2)" />
						<stop offset="50.1%" stopColor="rgb(3, 64, 2)" />
						<stop offset="52%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="53%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="70%" stopColor="rgba(23, 95, 55, 1.0)" />
						<stop offset="90%" stopColor="rgba(2, 180, 2, 1.0)" />
					</radialGradient>
				</defs>
			</svg>
		</>
	);
}
