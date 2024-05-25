import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import styles from "./Flower.module.css";

export default function Flower() {
	useEffect(() => {
		anime({
			targets: "#flower_big",
			d: [
				{
					value:
						"m250.0133,236.74454c2.63884,-4.66382 8.78455,-0.2125 0.59027,13.1862q0.08102,0.04474 0.15046,0.10066c10.34702,-11.83291 16.90939,-7.54935 13.11317,-3.9033c5.486,0.76053 3.21753,7.80659 -12.75438,5.04409q-0.02315,0.08947 -0.05787,0.16776c15.34692,5.23422 13.37936,12.63818 8.47205,10.47962c1.12266,5.20067 -6.63181,5.54738 -9.35167,-9.8533q-0.08102,0.01118 -0.17361,0.01118q-0.06944,0 -0.12731,-0.01118c-2.75458,15.27765 -10.71738,14.71844 -9.32852,9.73028c-5.16193,1.95724 -6.87486,-5.21185 8.36789,-10.44607q-0.03472,-0.10066 -0.05787,-0.20132c-15.98348,2.75132 -18.14779,-4.58553 -12.77752,-5.04409c-3.69206,-3.95922 2.81244,-7.96317 13.20576,3.99277q0.05787,-0.04474 0.12731,-0.07829c-8.17113,-13.38752 -1.68978,-17.83884 0.60184,-13.17502z"
				},
				{
					value:
						"m250.1,131.5c22.8,-41.7 75.9,-1.9 5.1,117.9q0.7,0.4 1.3,0.9c89.4,-105.8 146.1,-67.5 113.3,-34.9c47.4,6.8 27.8,69.8 -110.2,45.1q-0.2,0.8 -0.5,1.5c132.6,46.8 115.6,113 73.2,93.7c9.7,46.5 -57.3,49.6 -80.8,-88.1q-0.7,0.1 -1.5,0.1q-0.6,0 -1.1,-0.1c-23.8,136.6 -92.6,131.6 -80.6,87c-44.6,17.5 -59.4,-46.6 72.3,-93.4q-0.3,-0.9 -0.5,-1.8c-138.1,24.6 -156.8,-41 -110.4,-45.1c-31.9,-35.4 24.3,-71.2 114.1,35.7q0.5,-0.4 1.1,-0.7c-70.6,-119.7 -14.6,-159.5 5.2,-117.8z"
				}
			],
			delay: 800,
			autoplay: true,
			easing: "easeOutCubic",
			duration: 2000,
			loop: false
		});
		anime({
			targets: "#flower_small",
			d: [
				{
					value:
						"m232.25116,254.15663c-6.52165,-1.55735 -3.55881,-9.67545 13.87766,-5.74894q1.43034,0.69584 3.08203,1.39168q-0.613,0.99405 -1.15789,1.9384c-13.58818,12.69075 -20.84203,6.59389 -15.8018,2.41886zm16.95969,-4.35727q0.17028,-0.24851 0.34056,-0.51359q0.03406,0.01657 0.08514,0.01657q0,0.11597 -0.01703,0.23195q0.08514,-0.0497 0.17028,-0.08284q0.06811,0.06627 0.11919,0.13254q0,-0.08284 0,-0.16568q-0.05108,0.01657 -0.11919,0.03314q-0.01703,-0.03314 -0.05108,-0.0497q0.05108,-0.01657 0.08514,-0.03314q-0.08514,-0.03314 -0.18731,-0.06627q0,-0.08284 0,-0.16568q0.10217,-0.16568 0.22136,-0.31478q0,0 0.01703,0.01657q0.01703,0.24851 0.03406,0.51359q0.11919,-0.0497 0.23839,-0.08284q0.01703,0.01657 0.01703,0.03314q-0.10217,0.0497 -0.22136,0.09941q0.17028,0.0497 0.35758,0.09941q0,0 0,0.01657q-0.10217,0.11597 -0.22136,0.23195q0.49381,0.49703 0.97058,0.97749c9.96126,16.48472 1.73684,21.90231 -1.19195,16.05397c-3.30339,5.73238 -10.86374,0.64613 -1.80495,-15.04334q0.85139,-0.79524 1.73684,-1.70646q-0.28947,-0.11597 -0.57895,-0.23195zm-3.08203,-1.39168c-16.07424,-7.80332 -12.6176,-16.10367 -6.91329,-13.03867c-0.71517,-6.59389 8.78634,-6.51105 10.54021,12.14402q-0.06811,0.79524 -0.11919,1.62362q-0.03406,0.06627 -0.08514,0.14911q-1.80495,-0.51359 -3.42259,-0.87808zm3.78017,1.1763q0.01703,0.14911 0.01703,0.31478q0.08514,-0.08284 0.15325,-0.14911q-0.08514,-0.08284 -0.17028,-0.16568zm10.43804,-14.77826c6.40245,-2.99873 9.56962,6.2294 -9.89315,14.38064q-0.15325,0.03314 -0.3065,0.08284q-0.13622,-0.21538 -0.27244,-0.43076q-0.05108,-0.67927 -0.11919,-1.3254c1.63467,-19.2018 11.68107,-19.13553 10.59129,-12.70732zm-10.52318,14.56288q0.03406,0.01657 0.08514,0.01657q0,-0.01657 0,-0.03314q-0.05108,0 -0.08514,0.01657zm0.08514,0.01657q0,0.01657 0,0.03314q0.01703,-0.01657 0.03406,-0.01657q-0.01703,-0.01657 -0.03406,-0.01657zm17.89622,4.65548c5.04023,4.68862 -2.5712,10.58667 -16.75535,-3.31351q-0.35758,-0.59643 -0.74922,-1.20943q0,0 0,-0.01657q-0.06811,-0.09941 -0.13622,-0.19881q0.15325,-0.06627 0.28947,-0.11597c20.48444,-5.86492 24.16245,3.61173 17.35133,4.85429zm-17.86216,-3.94308q0,-0.09941 -0.01703,-0.19881q-0.06811,0.06627 -0.13622,0.13254q0.08514,0.03314 0.15325,0.06627z"
				},
				{
					value:
						"m145.8,275.1c-38.3,-9.4 -20.9,-58.4 81.5,-34.7q8.4,4.2 18.1,8.4q-3.6,6 -6.8,11.7c-79.8,76.6 -122.4,39.8 -92.8,14.6zm99.6,-26.3q1,-1.5 2,-3.1q0.2,0.1 0.5,0.1q0,0.7 -0.1,1.4q0.5,-0.3 1,-0.5q0.4,0.4 0.7,0.8q0,-0.5 0,-1q-0.3,0.1 -0.7,0.2q-0.1,-0.2 -0.3,-0.3q0.3,-0.1 0.5,-0.2q-0.5,-0.2 -1.1,-0.4q0,-0.5 0,-1q0.6,-1 1.3,-1.9q0,0 0.1,0.1q0.1,1.5 0.2,3.1q0.7,-0.3 1.4,-0.5q0.1,0.1 0.1,0.2q-0.6,0.3 -1.3,0.6q1,0.3 2.1,0.6q0,0 0,0.1q-0.6,0.7 -1.3,1.4q2.9,3 5.7,5.9c58.5,99.5 10.2,132.2 -7,96.9c-19.4,34.6 -63.8,3.9 -10.6,-90.8q5,-4.8 10.2,-10.3q-1.7,-0.7 -3.4,-1.4zm-18.1,-8.4c-94.4,-47.1 -74.1,-97.2 -40.6,-78.7c-4.2,-39.8 51.6,-39.3 61.9,73.3q-0.4,4.8 -0.7,9.8q-0.2,0.4 -0.5,0.9q-10.6,-3.1 -20.1,-5.3zm22.2,7.1q0.1,0.9 0.1,1.9q0.5,-0.5 0.9,-0.9q-0.5,-0.5 -1,-1zm61.3,-89.2c37.6,-18.1 56.2,37.6 -58.1,86.8q-0.9,0.2 -1.8,0.5q-0.8,-1.3 -1.6,-2.6q-0.3,-4.1 -0.7,-8c9.6,-115.9 68.6,-115.5 62.2,-76.7zm-61.8,87.9q0.2,0.1 0.5,0.1q0,-0.1 0,-0.2q-0.3,0 -0.5,0.1zm0.5,0.1q0,0.1 0,0.2q0.1,-0.1 0.2,-0.1q-0.1,-0.1 -0.2,-0.1zm105.1,28.1c29.6,28.3 -15.1,63.9 -98.4,-20q-2.1,-3.6 -4.4,-7.3q0,0 0,-0.1q-0.4,-0.6 -0.8,-1.2q0.9,-0.4 1.7,-0.7c120.3,-35.4 141.9,21.8 101.9,29.3zm-104.9,-23.8q0,-0.6 -0.1,-1.2q-0.4,0.4 -0.8,0.8q0.5,0.2 0.9,0.4z"
				}
			],
			delay: 1000,
			autoplay: true,
			easing: "easeOutCubic",
			duration: 2300,
			loop: false
		});
		anime({
			targets: "#lvs_topleft_bottomright",
			d: [
				{
					value:
						"m253.74353,253.66528l-7.51984,-7.33063m7.63447,7.41976c-0.29804,0.04456 14.85627,-0.20053 23.88926,8.5784c9.03298,8.77893 8.89542,23.26195 8.82664,23.21738c-0.06878,-0.04456 -14.85627,0.22282 -23.91218,-8.5784c-9.03298,-8.77893 -8.5286,-23.26195 -8.80372,-23.21738zm-40.44208,-39.30467c-0.27512,0.04456 14.85627,-0.20053 23.88926,8.5784c9.03298,8.77893 8.89542,23.28423 8.82664,23.21738c-0.06878,-0.04456 -14.85627,0.22282 -23.88926,-8.55612c-9.05591,-8.80122 -8.55153,-23.26195 -8.82664,-23.23967z"
				},
				{
					value:
						"m266.3,266.4l-32.8,-32.9m33.3,33.3c-1.3,0.2 64.8,-0.9 104.2,38.5c39.4,39.4 38.8,104.4 38.5,104.2c-0.3,-0.2 -64.8,1 -104.3,-38.5c-39.4,-39.4 -37.2,-104.4 -38.4,-104.2zm-176.4,-176.4c-1.2,0.2 64.8,-0.9 104.2,38.5c39.4,39.4 38.8,104.5 38.5,104.2c-0.3,-0.2 -64.8,1 -104.2,-38.4c-39.5,-39.5 -37.3,-104.4 -38.5,-104.3z"
				}
			],
			autoplay: true,
			easing: "easeOutCubic",
			duration: 2300,
			loop: false
		});
		anime({
			targets: "#lvs_bottomleft_topright",
			d: [
				{
					value:
						"m253.44452,246.3518l-6.88915,7.30653m-30.05601,31.87695c0.021,0.26731 -0.21004,-14.43485 8.06534,-23.21159c8.29638,-8.77674 21.94866,-8.64309 21.90665,-8.57626c-0.06301,0.06683 0.18903,14.43485 -8.08635,23.21159c-8.27538,8.79902 -21.92766,8.30895 -21.88565,8.57626zm37.02917,-39.27259c0.04201,0.26731 -0.18903,-14.43485 8.08635,-23.23387c8.27538,-8.77674 21.94866,-8.62081 21.88565,-8.55398c-0.04201,0.06683 0.21004,14.43485 -8.06534,23.21159c-8.29638,8.77674 -21.92766,8.30895 -21.90665,8.57626z"
				},
				{
					value:
						"m266.4,233.5l-32.8,32.8m-143.1,143.1c0.1,1.2 -1,-64.8 38.4,-104.2c39.5,-39.4 104.5,-38.8 104.3,-38.5c-0.3,0.3 0.9,64.8 -38.5,104.2c-39.4,39.5 -104.4,37.3 -104.2,38.5zm176.3,-176.3c0.2,1.2 -0.9,-64.8 38.5,-104.3c39.4,-39.4 104.5,-38.7 104.2,-38.4c-0.2,0.3 1,64.8 -38.4,104.2c-39.5,39.4 -104.4,37.3 -104.3,38.5z"
				}
			],
			autoplay: true,
			easing: "easeOutCubic",
			duration: 2300,
			loop: false
		});
	}, []);

	return (
		<>
			<div className={styles["flowers-vase"]}></div>
			<div
				style={{ transform: "scale(0.45)" }}
				className={styles["flowers-container"]}
			>
				<svg
					width="500"
					height="500"
					xmlns="http://www.w3.org/2000/svg"
					version="1.2"
					id="flowerSvg"
					style={{
						position: "absolute"
					}}
					className={styles["flower-svg"]}
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
					<path
						id="flower_small"
						strokeWidth="3"
						stroke="rgba(2, 180, 2, 0.9)"
						fill="url(#myGradient)"
						className={styles["flowers-path"]}
						d="m232.25116,254.15663c-6.52165,-1.55735 -3.55881,-9.67545 13.87766,-5.74894q1.43034,0.69584 3.08203,1.39168q-0.613,0.99405 -1.15789,1.9384c-13.58818,12.69075 -20.84203,6.59389 -15.8018,2.41886zm16.95969,-4.35727q0.17028,-0.24851 0.34056,-0.51359q0.03406,0.01657 0.08514,0.01657q0,0.11597 -0.01703,0.23195q0.08514,-0.0497 0.17028,-0.08284q0.06811,0.06627 0.11919,0.13254q0,-0.08284 0,-0.16568q-0.05108,0.01657 -0.11919,0.03314q-0.01703,-0.03314 -0.05108,-0.0497q0.05108,-0.01657 0.08514,-0.03314q-0.08514,-0.03314 -0.18731,-0.06627q0,-0.08284 0,-0.16568q0.10217,-0.16568 0.22136,-0.31478q0,0 0.01703,0.01657q0.01703,0.24851 0.03406,0.51359q0.11919,-0.0497 0.23839,-0.08284q0.01703,0.01657 0.01703,0.03314q-0.10217,0.0497 -0.22136,0.09941q0.17028,0.0497 0.35758,0.09941q0,0 0,0.01657q-0.10217,0.11597 -0.22136,0.23195q0.49381,0.49703 0.97058,0.97749c9.96126,16.48472 1.73684,21.90231 -1.19195,16.05397c-3.30339,5.73238 -10.86374,0.64613 -1.80495,-15.04334q0.85139,-0.79524 1.73684,-1.70646q-0.28947,-0.11597 -0.57895,-0.23195zm-3.08203,-1.39168c-16.07424,-7.80332 -12.6176,-16.10367 -6.91329,-13.03867c-0.71517,-6.59389 8.78634,-6.51105 10.54021,12.14402q-0.06811,0.79524 -0.11919,1.62362q-0.03406,0.06627 -0.08514,0.14911q-1.80495,-0.51359 -3.42259,-0.87808zm3.78017,1.1763q0.01703,0.14911 0.01703,0.31478q0.08514,-0.08284 0.15325,-0.14911q-0.08514,-0.08284 -0.17028,-0.16568zm10.43804,-14.77826c6.40245,-2.99873 9.56962,6.2294 -9.89315,14.38064q-0.15325,0.03314 -0.3065,0.08284q-0.13622,-0.21538 -0.27244,-0.43076q-0.05108,-0.67927 -0.11919,-1.3254c1.63467,-19.2018 11.68107,-19.13553 10.59129,-12.70732zm-10.52318,14.56288q0.03406,0.01657 0.08514,0.01657q0,-0.01657 0,-0.03314q-0.05108,0 -0.08514,0.01657zm0.08514,0.01657q0,0.01657 0,0.03314q0.01703,-0.01657 0.03406,-0.01657q-0.01703,-0.01657 -0.03406,-0.01657zm17.89622,4.65548c5.04023,4.68862 -2.5712,10.58667 -16.75535,-3.31351q-0.35758,-0.59643 -0.74922,-1.20943q0,0 0,-0.01657q-0.06811,-0.09941 -0.13622,-0.19881q0.15325,-0.06627 0.28947,-0.11597c20.48444,-5.86492 24.16245,3.61173 17.35133,4.85429zm-17.86216,-3.94308q0,-0.09941 -0.01703,-0.19881q-0.06811,0.06627 -0.13622,0.13254q0.08514,0.03314 0.15325,0.06627z"
					/>
					<path
						id="flower_big"
						strokeWidth="3"
						stroke="#000"
						fill="url(#myGradient)"
						className={styles["flowers-path"]}
						d="m250.0133,236.74454c2.63884,-4.66382 8.78455,-0.2125 0.59027,13.1862q0.08102,0.04474 0.15046,0.10066c10.34702,-11.83291 16.90939,-7.54935 13.11317,-3.9033c5.486,0.76053 3.21753,7.80659 -12.75438,5.04409q-0.02315,0.08947 -0.05787,0.16776c15.34692,5.23422 13.37936,12.63818 8.47205,10.47962c1.12266,5.20067 -6.63181,5.54738 -9.35167,-9.8533q-0.08102,0.01118 -0.17361,0.01118q-0.06944,0 -0.12731,-0.01118c-2.75458,15.27765 -10.71738,14.71844 -9.32852,9.73028c-5.16193,1.95724 -6.87486,-5.21185 8.36789,-10.44607q-0.03472,-0.10066 -0.05787,-0.20132c-15.98348,2.75132 -18.14779,-4.58553 -12.77752,-5.04409c-3.69206,-3.95922 2.81244,-7.96317 13.20576,3.99277q0.05787,-0.04474 0.12731,-0.07829c-8.17113,-13.38752 -1.68978,-17.83884 0.60184,-13.17502z"
					/>
					<defs>
						<radialGradient cx="50%" cy="52%" id="myGradient">
							<stop offset="5%" stopColor="rgb(23, 23, 23)" />
							<stop offset="20%" stopColor="rgb(123, 19, 161)" />
							<stop offset="30%" stopColor="rgb(154, 23, 202)" />
							<stop offset="65%" stopColor="rgb(239, 109, 215)" />
							<stop offset="90%" stopColor="rgb(240, 143, 248)" />
							<stop offset="99%" stopColor="rgb(123, 19, 161)" />
						</radialGradient>

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
				</svg>
			</div>
		</>
	);
}
