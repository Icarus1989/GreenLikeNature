"use client";

import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import styles from "./GrowingTomato.module.css";

import {
	tomatoBeginPath,
	tomatoEndPath,
	leavesUpBeginPath,
	leavesUpEndPath,
	leavesDownBeginPath,
	leavesDownEndPath,
	endLeavesDown,
	endLeavesUp,
	plantLightBeginPath,
	plantLightEndPath,
	plantDarkBeginPath,
	plantDarkEndPath
} from "./svgPaths";

export default function GrowingTomato({
	id,
	lightPerc,
	growingPerc,
	xPerc,
	yPerc,
	autoplay
}) {
	const tomatoPathRef = useRef(null);

	useEffect(() => {
		const tomatoPathAnim = anime({
			targets: `#firstTomatoPath${id}`,
			d: [
				{
					value: tomatoBeginPath
				},
				{
					value: tomatoEndPath
				}
			],
			delay: 50,

			// filter: [
			// 	{ value: "hue-rotate(80deg)", delay: 0 },
			// 	{ value: "hue-rotate(0deg)", delay: 500 }
			// ],
			autoplay: false,
			easing: "linear",
			duration: 2500,
			loop: false
		});

		// const tomatoPathHueRot = anime({
		// 	targets: `tomatoSvg${id}`,
		// 	// filter: "hue-rotate(0deg)",
		// 	filter: [
		// 		{ value: "hue-rotate(80deg)", delay: 0 },
		// 		{ value: "hue-rotate(0deg)", delay: 500 }
		// 	],
		// 	delay: 1500,
		// 	autoplay: false,
		// 	easing: "linear",
		// 	duration: 2500,
		// 	loop: false
		// });

		const leavesUpAnim = anime({
			targets: `#leavesUp${id}`,
			d: [
				{
					value: leavesUpBeginPath
				},
				{
					value: leavesUpEndPath
				}
			],
			fill: "#217D05",
			delay: 0,
			autoplay: false,
			easing: "linear",
			duration: 1800,
			loop: false
		});

		const leavesDownAnim = anime({
			targets: `#leavesDown${id}`,
			d: [
				{
					value: leavesDownBeginPath
				},
				{
					value: leavesDownEndPath
				}
			],
			fill: "#045904",
			delay: 0,
			autoplay: false,
			easing: "linear",
			duration: 1800,
			loop: false
		});

		const plantLightAnim = anime({
			targets: `#plantLight${id}`,
			d: [
				{
					value: plantLightBeginPath
				},
				{
					value: plantLightEndPath
				}
			],
			fill: "none",
			autoplay: false,
			// easing: "linear",
			duration: 2800,
			loop: false,
			easing: "spring(1.2, 80, 7, 0)"
		});

		const plantDarkAnim = anime({
			targets: `#plantDark${id}`,
			d: [
				{
					value: plantDarkBeginPath
				},
				{
					value: plantDarkEndPath
				}
			],
			fill: "none",
			autoplay: false,
			easing: "spring(1.2, 80, 7, 0)",
			duration: 2800,
			loop: false
		});

		const endLeavesAnim = anime({
			targets: `#endLeaves${id}`,
			rotate: "30deg",
			translateX: "-30%",
			translateY: "45%",
			delay: 1300,
			autoplay: false,
			easing: "spring(1.3, 80, 7, 0)",
			duration: 1800,
			loop: false
		});

		const tomatoSvgAnim = anime({
			targets: `#tomatoSvg${id}`,
			translateY: ["0%", "+11%", "+7%"],
			delay: 1000,
			autoplay: false,
			easing: "spring(2.5, 80, 7, 0)",
			duration: 1200,
			loop: false
		});

		if (autoplay !== false) {
			tomatoSvgAnim.play();
			tomatoPathAnim.play();
			// tomatoPathHueRot.play();
			leavesUpAnim.play();
			leavesDownAnim.play();
			plantLightAnim.play();
			plantDarkAnim.play();
			endLeavesAnim.play();
		}
	}, [autoplay, id]);

	useEffect(() => {
		// let timeout = null;
		if (autoplay !== false) {
			// tomatoPathRef.current.style.animationName = "ripe";
			// tomatoPathRef.current.style.animationDuration = "3s";
			// tomatoPathRef.current.style.animationComposition = "replace";
			// tomatoPathRef.current.style.animationTimingFunction = "linear";

			tomatoPathRef.current.parentElement.animate(
				[
					{ filter: "hue-rotate(80deg)" },
					{ filter: "hue-rotate(40deg)", offset: 0.8 },
					{ filter: "hue-rotate(0deg)" }
				],
				2000
			);
			// timeout = setTimeout(() => {
			tomatoPathRef.current.parentElement.style.filter = "hue-rotate(0deg)";
			tomatoPathRef.current.parentElement.children[1].style.filter =
				"hue-rotate(0deg)";
			tomatoPathRef.current.parentElement.children[2].style.filter =
				"hue-rotate(0deg)";
			// }, 4000);
			// timeout();
		}
		// else if (autoplay === false) {
		// 	tomatoPathRef.current.parentElement.children[1].style.filter =
		// 		"hue-rotate(280deg)";
		// 	tomatoPathRef.current.parentElement.children[2].style.filter =
		// 		"hue-rotate(280deg)";
		// }

		// filter: "hue-rotate(280deg)";
		// console.log(tomatoPathRef.current.parentElement.children);
		// else if (autoplay === false) {
		// 	// tomatoPathRef.current.animate([{ filter: "hue-rotate(80deg)" }], 2000);
		// 	tomatoPathRef.current.style.filter = ;
		// }
		// console.log(autoplay);
		// return () => {
		// 	if (timeout) {
		// 		clearTimeout(timeout);
		// 	}
		// };
	}, [autoplay]);

	return (
		<div className={styles["animation-container"]}>
			<svg
				viewBox="0 0 200 100"
				xmlns="http://www.w3.org/2000/svg"
				className={styles["small-plant-svg"]}
			>
				<path
					id={`plantLight${id}`}
					style={{
						fill: "none",
						strokeWidth: "4px",
						strokeLinecap: "round",
						stroke: "rgba(2, 123, 2, 0.95)"
					}}
					d={plantLightBeginPath}
				/>
				<path
					id={`plantDark${id}`}
					style={{
						fill: "none",
						strokeWidth: "5px",
						strokeLinecap: "round",
						stroke: "rgba(3, 64, 2, 0.95)"
					}}
					d={plantDarkBeginPath}
				/>
			</svg>
			<svg
				viewBox="0 0 123 131"
				xmlns="http://www.w3.org/2000/svg"
				className={styles["tomato-svg"]}
				id={`tomatoSvg${id}`}
				style={{
					transform: `scale(${growingPerc}, ${growingPerc}) translate(${xPerc}, ${yPerc})`,
					filter: "hue-rotate(80deg)"
				}}
			>
				<path
					id={`firstTomatoPath${id}`}
					ref={tomatoPathRef}
					className={
						styles["firstTomatoPath"]
						// autoplay === false
						// 	? styles["firstTomatoPath"]
						// 	: styles["firstTomatoPathAnim"]
						// : styles["firstTomatoPath firstTomatoPathAnim"] da provare pom
					}
					fill={`url(#tomatoRedGradient${id})`}
					style={{
						stroke: "#BF0300",
						strokeWidth: "1px"
						// animation:
						// filter: "hue-rotate(80deg)"
					}}
					// animation={autoplay === false ? "none" : "ripe 3s linear"}
					d={tomatoBeginPath}
				/>
				<path
					id={`leavesUp${id}`}
					fill="#217D05"
					style={{
						stroke: "#154F03",
						strokeWidth: "1px"
						// filter: "hue-rotate(280deg)"
					}}
					className={styles["tomato-leaves"]}
					d={leavesUpBeginPath}
				/>
				<path
					id={`leavesDown${id}`}
					fill="#217D05"
					style={{
						stroke: "#154F03",
						strokeWidth: "1px"
						// filter: "hue-rotate(280deg)"
					}}
					className={styles["tomato-leaves"]}
					d={leavesDownBeginPath}
				/>

				<defs>
					<radialGradient
						fx={lightPerc}
						fy="50%"
						cx={lightPerc}
						cy="50%"
						id={`tomatoRedGradient${id}`}
					>
						<stop offset="2%" stopColor="#FDDED4" />
						<stop offset="23%" stopColor="#F69566" />
						<stop offset="50%" stopColor="#F63929" />
						<stop offset="60%" stopColor="#E90F0E" />
						<stop offset="80%" stopColor="#CC0300" />
						<stop offset="95%" stopColor="#BF0300" />
					</radialGradient>
				</defs>
				<defs>
					<radialGradient
						fx={lightPerc}
						fy="50%"
						cx={lightPerc}
						cy="50%"
						id="tomatoYellowGradient"
					>
						<stop offset="2%" stopColor="#FDDED4" />
						<stop offset="23%" stopColor="#FFE236" />
						<stop offset="50%" stopColor="#FFD235" />
						<stop offset="60%" stopColor="#FFC12D" />
						<stop offset="80%" stopColor="#FFAD1E" />
						<stop offset="95%" stopColor="#FF980D" />
					</radialGradient>
				</defs>
			</svg>

			<svg
				viewBox="0 0 26 28"
				xmlns="http://www.w3.org/2000/svg"
				id={`endLeaves${id}`}
				className={styles["end-leaves"]}
				style={{
					transform: "scale(0.23, 0.23) translate(130%, 23%)"
				}}
			>
				<path
					fill="url(#leavesGradient)"
					style={{ stroke: "rgba(3, 64, 2, 0.95)", strokeWidth: "0.5px" }}
					d={endLeavesDown}
				/>
				<path
					fill="url(#leavesGradient)"
					style={{ stroke: "rgba(3, 64, 2, 0.95)", strokeWidth: "0.5px" }}
					d={endLeavesUp}
					transform="matrix(0.906308, -0.422618, 0.422618, 0.906308, -2.411201, 6.335988)"
				/>
				<defs>
					<radialGradient
						fx="-68%"
						fy="170%"
						cx="-68%"
						cy="170%"
						r="360%"
						id="leavesGradient"
					>
						<stop offset="10%" stopColor="rgba(23, 230, 40, 1.0)" />
						<stop offset="30%" stopColor="rgba(23, 230, 40, 1.0)" />
						<stop offset="47%" stopColor="rgba(23, 95, 55, 1.0)" />
						<stop offset="48%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="49.9%" stopColor="rgb(3, 64, 2)" />
						<stop offset="50.1%" stopColor="rgb(3, 64, 2)" />
						<stop offset="52%" stopColor="rgba(4, 89, 4, 1.0)" />
						<stop offset="53%" stopColor="rgba(23, 95, 55, 1.0)" />
						<stop offset="70%" stopColor="rgba(2, 180, 2, 1.0)" />
						<stop offset="90%" stopColor="rgba(2, 180, 2, 1.0)" />
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
}
