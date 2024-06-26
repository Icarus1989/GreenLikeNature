import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ children }) {
	return (
		<div className={styles["loading-container"]}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				className={styles["spinner-svg"]}
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
				<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
			</svg>
			{children}
			{/* <svg
				width="500"
				height="500"
				xmlns="http://www.w3.org/2000/svg"
				version="1.2"
				id="flowerSvg"
				className={styles["leaves-svg"]}
			>
				<path
					id="lvs_topleft_bottomright"
					strokeWidth="3"
					stroke="#000"
					fill="url(#mySecondGradient)"
					className={styles["leaves-path"]}
					d="m253.74353,253.66528l-7.51984,-7.33063m7.63447,7.41976c-0.29804,0.04456 14.85627,-0.20053 23.88926,8.5784c9.03298,8.77893 8.89542,23.26195 8.82664,23.21738c-0.06878,-0.04456 -14.85627,0.22282 -23.91218,-8.5784c-9.03298,-8.77893 -8.5286,-23.26195 -8.80372,-23.21738zm-40.44208,-39.30467c-0.27512,0.04456 14.85627,-0.20053 23.88926,8.5784c9.03298,8.77893 8.89542,23.28423 8.82664,23.21738c-0.06878,-0.04456 -14.85627,0.22282 -23.88926,-8.55612c-9.05591,-8.80122 -8.55153,-23.26195 -8.82664,-23.23967z"
				/>
				<path
					id="lvs_bottomleft_topright"
					strokeWidth="3"
					stroke="rgba(2, 180, 2, 0.9)"
					className={styles["leaves-path"]}
					fill="url(#myThirdGradient)"
					d="m253.44452,246.3518l-6.88915,7.30653m-30.05601,31.87695c0.021,0.26731 -0.21004,-14.43485 8.06534,-23.21159c8.29638,-8.77674 21.94866,-8.64309 21.90665,-8.57626c-0.06301,0.06683 0.18903,14.43485 -8.08635,23.21159c-8.27538,8.79902 -21.92766,8.30895 -21.88565,8.57626zm37.02917,-39.27259c0.04201,0.26731 -0.18903,-14.43485 8.08635,-23.23387c8.27538,-8.77674 21.94866,-8.62081 21.88565,-8.55398c-0.04201,0.06683 0.21004,14.43485 -8.06534,23.21159c-8.29638,8.77674 -21.92766,8.30895 -21.90665,8.57626z"
				/>
				<defs>
					<linearGradient
						x1="0%"
						x2="100%"
						y1="100%"
						y2="0%"
						id="mySecondGradient"
						gradientTransform="rotate(-0.1)"
					>
						<stop offset="10%" stopColor="rgba(2, 180, 2, 1.0)" />
						<stop offset="30%" stopColor="rgba(2, 180, 2, 0.9)" />
						<stop offset="47%" stopColor="rgba(23, 95, 55, 0.9)" />
						<stop offset="48%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="49.9%" stopColor="rgb(3, 64, 2)" />
						<stop offset="50.1%" stopColor="rgb(3, 64, 2)" />
						<stop offset="52%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="53%" stopColor="rgba(23, 95, 55, 0.9)" />
						<stop offset="70%" stopColor="rgba(2, 180, 2, 0.9)" />
						<stop offset="90%" stopColor="rgba(2, 180, 2, 1.0)" />
					</linearGradient>

					<linearGradient
						x1="0%"
						x2="100%"
						y1="0%"
						y2="100%"
						id="myThirdGradient"
						gradientTransform="rotate(-0.1)"
					>
						<stop offset="10%" stopColor="rgba(2, 180, 2, 1.0)" />
						<stop offset="30%" stopColor="rgba(2, 180, 2, 0.9)" />
						<stop offset="47%" stopColor="rgba(23, 95, 55, 0.9)" />
						<stop offset="48%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="49.9%" stopColor="rgb(3, 64, 2)" />
						<stop offset="50.1%" stopColor="rgb(3, 64, 2)" />
						<stop offset="52%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="53%" stopColor="rgba(23, 95, 55, 0.9)" />
						<stop offset="70%" stopColor="rgba(2, 180, 2, 0.9)" />
						<stop offset="90%" stopColor="rgba(2, 180, 2, 1.0)" />
					</linearGradient>
				</defs>
			</svg> */}
		</div>
	);
}
