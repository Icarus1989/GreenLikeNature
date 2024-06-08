"use client";

import { Fragment, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import {
	extPathInvStart,
	extPathInvEnd,
	firstPathInvStart,
	firstPathInvEnd,
	secondPathInvStart,
	secondPathInvEnd,
	thirdPathInvStart,
	thirdPathInvEnd,
	ExtPathStart,
	ExtPathEnd,
	firstPathStart,
	firstPathEnd,
	secondPathStart,
	secondPathEnd,
	thirdPathStart,
	thirdPathEnd
} from "./Paths";
import {
	strawLeafGradientInv,
	leafStrokeGradientInv,
	leafStrokeIntGradient,
	strawLeafGradient,
	leafStrokeGradient
} from "./Defs";
import styles from "./StrawCoupleLeaves.module.css";

export default function StrawCoupleLeaves({
	id,
	isActive,
	width,
	topMeasure,
	leftMeasure,
	scale,
	rotateZ,
	rotateY,
	leafWidth,
	leafHeight
	// filter
}) {
	useEffect(() => {
		if (isActive) {
			anime({
				targets: `#ExtPathInv${id}`,
				d: [
					{
						value: extPathInvStart
					},
					{
						value: extPathInvEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				loop: false
			});
			anime({
				targets: `#firstPathInv${id}`,
				d: [
					{
						value: firstPathInvStart
					},
					{
						value: firstPathInvEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				loop: false
			});
			anime({
				targets: `#secondPathInv${id}`,
				d: [
					{
						value: secondPathInvStart
					},
					{
						value: secondPathInvEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				loop: false
			});
			anime({
				targets: `#thirdPathInv${id}`,
				d: [
					{
						value: thirdPathInvStart
					},
					{
						value: thirdPathInvEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				loop: false
			});
			anime({
				targets: `#ExtPath${id}`,
				d: [
					{
						value: ExtPathStart
					},
					{
						value: ExtPathEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				delay: 0,
				loop: false
			});
			anime({
				targets: `#firstPath${id}`,
				d: [
					{
						value: firstPathStart
					},
					{
						value: firstPathEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				delay: 0,
				loop: false
			});
			anime({
				targets: `#secondPath${id}`,
				d: [
					{
						value: secondPathStart
					},
					{
						value: secondPathEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				delay: 0,
				loop: false
			});
			anime({
				targets: `#thirdPath${id}`,
				d: [
					{
						value: thirdPathStart
					},
					{
						value: thirdPathEnd
					}
				],
				opacity: { value: [0.1, 1.0], duration: 230 },
				autoplay: true,
				easing: "linear",
				duration: 500,
				delay: 0,
				loop: false
			});
		}
	}, [isActive]);
	return (
		<Fragment key={id}>
			<div
				className={styles["straw-leaves-container"]}
				style={{
					width: width,
					top: topMeasure,
					left: leftMeasure,
					transform: `scale(${scale}) rotateZ(${rotateZ}) rotateY(${rotateY})`
				}}
			>
				<motion.svg
					viewBox="0 0 260 260"
					xmlns="http://www.w3.org/2000/svg"
					className={styles["straw-leaf"]}
					style={{
						width: leafWidth,
						height: leafHeight
						// boxShadow: "0px 0px 5px rgb(0, 0, 0)"
						// filter: filter
					}}
				>
					<motion.path
						id={`ExtPathInv${id}`}
						fill="url(#strawLeafGradientInv)"
						strokeWidth="7px"
						stroke="url(#leafStrokeGradientInv)"
						d={isActive ? extPathInvStart : extPathInvEnd}
						transform="matrix(-1, 0, 0, -1, 256.947998, 262.315979)"
					/>
					<motion.path
						id={`firstPathInv${id}`}
						fill="none"
						stroke="url(#leafStrokeIntGradient)"
						style={{
							strokeWidth: "5px",
							fill: "none"
						}}
						d={isActive ? firstPathInvStart : firstPathInvEnd}
						transform="matrix(-1, 0, 0, -1, 266.971954, 297.757996)"
					/>
					<motion.path
						id={`secondPathInv${id}`}
						fill="none"
						stroke="url(#leafStrokeIntGradient)"
						d={isActive ? secondPathInvStart : secondPathInvEnd}
						transform="matrix(-1, 0, 0, -1, 264.895996, 321.850006)"
					/>
					<motion.path
						id={`thirdPathInv${id}`}
						fill="none"
						stroke="url(#leafStrokeIntGradient)"
						d={isActive ? thirdPathInvStart : thirdPathInvEnd}
						transform="matrix(-1, 0, 0, -1, 263.939972, 354.328003)"
					/>
					<defs>
						{strawLeafGradientInv}
						{leafStrokeGradientInv}
						{leafStrokeIntGradient}
					</defs>
				</motion.svg>

				<motion.svg
					className={styles["straw-leaf"]}
					viewBox="0 0 260 260"
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.path
						id={`ExtPath${id}`}
						fill="url(#strawLeafGradient)"
						strokeWidth="7px"
						stroke="url(#leafStrokeGradient)"
						d={isActive ? ExtPathStart : ExtPathEnd}
					/>
					<motion.path
						id={`firstPath${id}`}
						fill="none"
						stroke="url(#leafStrokeIntGradient)"
						style={{
							strokeWidth: "5px",
							fill: "none"
						}}
						d={isActive ? firstPathStart : firstPathEnd}
					/>
					<motion.path
						id={`secondPath${id}`}
						fill="none"
						stroke="url(#leafStrokeIntGradient)"
						d={isActive ? secondPathStart : secondPathEnd}
					/>
					<motion.path
						id={`thirdPath${id}`}
						fill="none"
						stroke="url(#leafStrokeIntGradient)"
						d={isActive ? thirdPathStart : thirdPathEnd}
					/>
					<defs>
						{strawLeafGradient}
						{leafStrokeGradient}
						{leafStrokeIntGradient}
					</defs>
				</motion.svg>
			</div>
		</Fragment>
	);
}
