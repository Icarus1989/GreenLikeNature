// function handleAnimComplete() {
// 	generalDispatch({
// 		type: "title_animated"
// 	});
// }

// const angVelocity = useVelocity(xVelocity);

// const leftMove = useMotionTemplate`${x}dvw`;

// const [limits, setLimits] = useState({ min: null, max: null });

// setLimits(() => {
// 	return {
// 		min: -sectionDim.width / 2,
// 		max: sectionDim.width / 2
// 	};
// });

// moveRef.current.style.width = sectionDim.width * 2 + "px";
// moveRef.current.style.left = -sectionDim.width / 2 + 1 + "px";

// useMotionValueEvent(x, "change", (lastX) => {
// 	angle.set(-lastX);
// });
// useEffect(() => {
// 	function updateAngle() {
// 		// angle.set(angle.get() + xVelocity.get() / -360);
// 		angle.set(angle.get() + -Number(xVelocity.get() / (360 / Math.PI)));
// 	}

// 	// const eventVel = xVelocity.on("change", (lastValue) => {
// 	// 	// console.log("Vel");
// 	// 	// console.log(lastValue);
// 	// 	// console.log("angVel");
// 	// 	// console.log(angVelocity.get());
// 	// 	// angle.set(angle.get() + -Number(xVelocity.get() / (360 / Math.PI)));
// 	// 	angle.set(angle.get() + xVelocity.get() / -360);
// 	// 	// if (xVelocity.get() === 0) {
// 	// 	// 	x.set(0);
// 	// 	// }
// 	// });

// 	const unsubVel = xVelocity.on("change", updateAngle);
// 	return () => {
// 		unsubVel();
// 		// moveRef.current.style.transform = "translateX(-235.95px)";
// 	};
// }, [xVelocity]);

// Limits --->

// useMotionValueEvent(x, "change", (lastX) => {
// 	// const invDiv = moveRef.current.getBoundingClientRect().width / 2;
// 	const invDiv = moveRef.current.getBoundingClientRect().width / 2 - 1;
// 	const actualAngle = angle.get();

// 	if (lastX === limits.max) {
// 		angle.jump(actualAngle);
// 		x.jump(0);
// 		console.log("limit");
// 	}

// 	if (lastX === limits.min) {
// 		angle.jump(actualAngle);

// 		x.jump(0);
// 		console.log("limit min");
// 	}
// 	// if (lastX === limits.min) {
// 	// 	x.jump(invDiv * 2);
// 	// }
// 	// else if (lastX === limits.max) {
// 	// 	x.jump(invDiv + 1);
// 	// }
// });

// useMotionValueEvent(x, "change", (lastX) => {
// 	if (lastX === limits.max || lastX === limits.min) {
// 		// xVelocity.set(0);
// 		x.jump(lastX);
// 		// x.set(0);
// 	}
// });

// const difference = 45;

// // if (recVelocity.length > 0) {
// // 	;
// // }
// if (recVelocity[0]) {
// 	const vel = recVelocity[0];
// 	console.log("start");
// 	rotateAngle(vel, difference);
// 	setRecVelocity((prevValue) => {
// 		return (prevValue = []);
// 	});
// }

// console.log("angle end");
// if (recVelocity[0] === 0) {
// setRecVelocity((prevValue) => {
// 	return (prevValue = []);
// });

// useMotionValueEvent(angle, "animation")

// const rotation = useMotionTemplate`translateZ(${angle})`;

// useMotionValueEvent(angle, "change", (lastAngle) => {
// 	// Invisible return
// 	// console.log(angle.get());
// 	if (x.get() <= limits.min) {
// 		// console.log(moveRef.current.getBoundingClientRect());
// 		// moveRef.current.style.transform = "none";
// 		// moveRef.current.style.left = "0px";
// 		// moveRef.current.style.transform =
// 		// 	"translateX(0px) translateY(0px) translateZ(0px)";
// 		// xVelocity.jump(x.getVelocity());
// 		// x.jump(0);
// 		angle.jump(lastAngle);
// 		console.log("limit");
// 	} else if (x.get() >= limits.max) {
// 		// Manca solo getstire arrivo al limite massimo poi test
// 		// moveRef.current.style.transform = `translateX(-${100}%)`;
// 		// moveRef.current.style.transform =
// 		// 	"translateX(0px) translateY(0px) translateZ(0px)";
// 		// xVelocity.jump(x.getVelocity());

// 		// x.jump(0);
// 		angle.jump(lastAngle);

// 		// moveRef.current.style.transform = "none";

// 		console.log("limit");
// 		// console.log(moveRef.current.style.left);
// 	}
// });

// useMotionValueEvent(x, "animationComplete", () => {
// 	// moveRef.current.style.transform =
// 	// 	"translateX(0px) translateY(0px) translateZ(0px)";
// 	const invDiv = moveRef.current.getBoundingClientRect().width / 2;
// 	x.set(invDiv);
// });

// useMotionValueEvent(xVelocity, "change", (lastVel) => {
// 	console.log(lastVel);
// 	angle.set(angle.get() + -Number(xVelocity.get() / (360 / Math.PI)));
// });

// useEffect(() => {
// 	console.log("initial");
// 	console.log(moveRef.current.getBoundingClientRect());
// 	// console.log(x.get());
// }, []);

// useMotionValueEvent(angle, "change", (lastAngle) => {
// 	// console.log(lastAngle);
// 	if (angle.get() >= 360) {
// 		x.set(-3 * sectionRef.current.getBoundingClientRect().width);
// 	} else if (angle.get() <= -360) {
// 		x.set(-3 * sectionRef.current.getBoundingClientRect().width);
// 	}
// });

// useMotionValueEvent(x, "animationComplete", () => {
// 	const actualAngle = angle.get();
// 	console.log(actualAngle);
// 	angle.set(angle.current);
// 	// x.set(0);
// 	x.set(-3 * sectionRef.current.getBoundingClientRect().width);

// 	console.log("complete");
// 	// x.set(0);
// });

// useEffect(() => {
// 	x.on("change", (lastX) => {
// 		if (lastX < `-300vw` || lastX > `300vw`) {
// 			x.set(0);
// 		}
// 	});
// }, []);

// useEffect(() => {
// 	angVelocity.on("change", (lastValue) => {
// 		// if (xVelocity.get() === 0) {
// 		// 	x.set(0);
// 		// }
// 		angle.set(lastValue / carouselRef.current.getBoundingClientRect().width);
// 	});
// });

// Movement and Title Detect Effect
// useEffect(() => {
// 	const invertedRecipes = [recipes[0], ...recipes.slice(1).reverse()];

// 	angle.on("change", (lastAngle) => {
// 		if (lastAngle >= 360) {
// 			// xVelocity.set(0);
// 			angle.set(0);
// 			// x.set(-3 * sectionRef.current.getBoundingClientRect().width);
// 		} else if (lastAngle <= -360) {
// 			// xVelocity.set(0);
// 			angle.set(0);
// 			// x.set(-3 * sectionRef.current.getBoundingClientRect().width);
// 		}

// 		if (lastAngle >= 0) {
// 			const actualVel = xVelocity.get();

// 			theta.map((piSection, index) => {
// 				if (
// 					(lastAngle - 15) * (Math.PI / 180) <= piSection &&
// 					piSection <= (lastAngle + 15) * (Math.PI / 180)
// 				) {
// 					// slow if plate proximity

// 					// testing here --->
// 					xVelocity.set(actualVel * 0.235);

// 					// change title if plate proximity

// 					const h4Title = titleRef.current.textContent;
// 					const actualTitle = invertedRecipes[index].title;
// 					h4Title !== actualTitle
// 						? (titleRef.current.textContent = invertedRecipes[index].title)
// 						: null;

// 					if (Math.round(lastAngle) % 22.5 === 0 && xVelocity.get() > -10) {
// 						// stop if plate max proximity
// 						xVelocity.set(0);
// 						// set perfect angle if plate max proximity
// 						angle.set(Math.round(angle.get()));
// 						// x.set(x.get());
// 					}
// 				}
// 				return;
// 			});
// 		} else if (lastAngle < 0) {
// 			const actualVel = xVelocity.get();
// 			theta.map((piSection, index) => {
// 				if (
// 					(lastAngle + 15) * (Math.PI / 180) >= -piSection &&
// 					-piSection >= (lastAngle - 15) * (Math.PI / 180)
// 				) {
// 					// testing here --->
// 					xVelocity.set(actualVel * 0.235);

// 					const h4Title = titleRef.current.textContent;
// 					const actualTitle = recipes[index].title;
// 					h4Title !== actualTitle
// 						? (titleRef.current.textContent = recipes[index].title)
// 						: null;

// 					if (Math.round(lastAngle) % -22.5 === 0 && xVelocity.get() < 10) {
// 						angle.set(Math.round(angle.get()));
// 						// x.set(x.get());
// 						xVelocity.set(0);
// 					}
// 				}
// 				return;
// 			});
// 		}
// 	});
// }, []);

// useMotionValueEvent(angle, "change", (lastAngle) => {
// 	if (lastAngle >= 0) {
// 		// const actualVel = xVelocity.get();

// 		theta.map((piSection, index) => {
// 			// test --->
// 			// if (Math.sin(angle.get() * (Math.PI / 180)) === Math.sin(piSection)) {
// 			// 	const h4Title = titleRef.current.textContent;
// 			// 	const actualTitle = invertedRecipes[index].title;
// 			// 	h4Title !== actualTitle
// 			// 		? (titleRef.current.textContent = invertedRecipes[index].title)
// 			// 		: null;
// 			// }
// 			// for (let sinValue of sinValues) {

// 			// if (Math.round(lastAngle) % 22.5 === 0) {
// 			// 	// stop if plate max proximity
// 			// 	xVelocity.set(0);
// 			// 	// set perfect angle if plate max proximity
// 			// 	angle.set(Math.round(lastAngle));
// 			// 	// x.set(x.get());
// 			// }

// 			// if (Math.round(angle.get()) % 22.5 === 0) {
// 			// console.log("Angle");
// 			// console.log(angle.get());
// 			// console.log(
// 			// 	Math.sin(angle.get() * (Math.PI / 180)) === Math.sin(piSection)
// 			// );
// 			// if (Math.sin(angle.get() * (Math.PI / 180)) === Math.sin(piSection)) {
// 			// 	console.log("HERE ---> " + piSection);
// 			// }
// 			// }

// 			// }

// 			if (
// 				((lastAngle % 360) - 15) * (Math.PI / 180) <= piSection &&
// 				piSection <= ((lastAngle % 360) + 15) * (Math.PI / 180)
// 			) {
// 				// <----- testing here

// 				// slow if plate proximity
// 				// console.log("Angle");
// 				// console.log(angle.get());
// 				// console.log("angle sin");
// 				// console.log(Math.sin(angle.get() * (Math.PI / 180)));
// 				// console.log("PI section");
// 				// console.log(piSection);
// 				// console.log("section sin");
// 				// console.log(Math.sin(piSection));

// 				// testing here --->
// 				// xVelocity.set(actualVel * 0.235);

// 				// change title if plate proximity

// 				const h4Title = titleRef.current.textContent;
// 				const actualTitle = invertedRecipes[index].title;
// 				h4Title !== actualTitle
// 					? (titleRef.current.textContent = invertedRecipes[index].title)
// 					: null;
// 				// if (Math.round(lastAngle) % 22.5 === 0) {
// 				// 	// stop if plate max proximity
// 				// 	xVelocity.set(0);
// 				// 	// set perfect angle if plate max proximity
// 				// 	angle.set(Math.round(lastAngle));
// 				// 	// x.set(x.get());
// 				// }
// 			}
// 		});
// 	} else if (lastAngle < 0) {
// 		// const actualVel = xVelocity.get();
// 		theta.map((piSection, index) => {
// 			if (
// 				((lastAngle % 360) + 15) * (Math.PI / 180) >= -piSection &&
// 				-piSection >= ((lastAngle % 360) - 15) * (Math.PI / 180)
// 			) {
// 				// <----- testing here
// 				// xVelocity.set(actualVel * 0.235);

// 				// console.log("Angle");
// 				// console.log(angle.get());
// 				// console.log("PI section");
// 				// console.log(piSection);
// 				// console.log("section sin");
// 				// console.log(Math.sin(piSection));

// 				const h4Title = titleRef.current.textContent;
// 				const actualTitle = recipes[index].title;
// 				h4Title !== actualTitle
// 					? (titleRef.current.textContent = recipes[index].title)
// 					: null;
// 				// if (Math.round(lastAngle) % -22.5 < 0.1) {
// 				// 	angle.set(Math.round(lastAngle));
// 				// 	// x.set(x.get());
// 				// 	xVelocity.set(0);
// 				// }
// 			}

// 			return;
// 		});
// 	}
// });

{
	/* <motion.div
	className={styles["invisible-div"]}
	ref={moveRef}
	drag="x"
	// dragConstraints={
	// 	!showModal
	// 		? { left: limits.min, right: limits.max }
	// 		: { left: 0, right: 0 }
	// }
	dragElastic={0}
	dragSnapToOrigin={true}
	// HERE
	style={{ x }}
	// onTapStart={() => {
	// if (recVelocity[0] === 0) {
	// 	setRecVelocity([]);
	// }
	// setRecVelocity((prevValue) => {
	// 	return (prevValue.length = 0);
	// });
	// recVelocity.length = 0;
	// }}
	// onClick={() => {
	// 	const actualAngle = angle.get();
	// 	x.set(0);
	// 	angle.set(actualAngle);
	// 	xVelocity.set(0);
	// }}
	// onPointerDown={() => {
	// 	const actualAngle = angle.get();
	// 	x.set(0);
	// 	angle.set(actualAngle);
	// 	xVelocity.set(0);
	// }}
	// onDragOver={}
	// onTapCancel={() => {
	// 	x.set(0);
	// }}
	// onTapStart={}

	// onTapStart={(event) => {
	// 	// console.log(event);
	// 	// const actualVelocity = xVelocity.get();
	// 	if (xVelocity.get() > 0) {
	// 		xVelocity.set(xVelocity.get());
	// 	}
	// 	const actualAngle = angle.get();
	// 	angle.set(actualAngle);

	// 	const invDiv = moveRef.current.getBoundingClientRect().width;
	// 	x.jump(invDiv);
	// 	// if (actualAngle < 0) {

	// 	// }

	// 	// const invDiv = moveRef.current.getBoundingClientRect().width / 2;

	// 	// x.set(event.clientX);
	// 	// x.set(-moveRef.current.getBoundingClientRect().width / 2);
	// 	// x.jump(0);
	// 	// moveRef.current.style.left =
	// 	// 	-moveRef.current.getBoundingClientRect().width / 2 + "px";
	// 	// moveRef.current.style.transform = `translateX(${0}px) translateY(0px) translateZ(0px)`;
	// 	// x.jump(x.get() - moveRef.current.getBoundingClientRect().left);
	// 	// x.stop();
	// 	// -2.5 * sectionDim.width;
	// 	// moveRef.current.style.transform = `translateX(${event.clientX}px) translateY(0px) translateZ(0px)`;
	// }}
	// whileTap={{ cursor: "grabbing" }}
></motion.div>; */
}

{
	/* <div className={styles["circular-container"]}>
	<motion.div
		ref={menuRef}
		className={styles["circular-menu"]}
		initial={{
			opacity: 0.0
		}}
		animate={{
			opacity: 1.0,
			transition: {
				delay: 0,
				duration: 1.0
			}
		}}
		// style={{
		// 	// rotateZ: angle
		// 	// rotateZ: rotation
		// 	rotateZ: angle
		// }}
		// onClick={() => {
		// 	// const actualAngle = angle.get();
		// 	console.log('"external click');
		// 	console.log(moveRef.current.getBoundingClientRect());
		// 	moveRef.current.style.left =
		// 		-moveRef.current.getBoundingClientRect().width / 2 + "px";
		// 	// if (xVelocity.get() < 1) {
		// 	// 	const actualAngle = angle.get();
		// 	// 	// x.set(0);
		// 	// 	angle.set(actualAngle);
		// 	// 	// x.set(0);
		// 	// }
		// 	// onClick={() => {
		// 	// 	x.set(-`300dvw`);
		// }}

		// onPointerDown={() => {
		// 	console.log(Number(moveRef.current.style.left.slice(0, -3)));
		// 	// const actualVelocity = xVelocity.get();
		// 	// if (xVelocity.get() > 0) {
		// 	xVelocity.set(xVelocity.get());
		// 	// }
		// 	const actualAngle = angle.get();
		// 	angle.set(actualAngle);

		// 	// moveRef.current.scrollTo(0, 0);
		// 	moveRef.current.style.transform = `translateX(${10}px)`;
		// 	// x.set(10);
		// 	// const distance =
		// 	// 	moveRef.current.getBoundingClientRect().left + "px";
		// 	// if (
		// 	// 	Number(moveRef.current.getBoundingClientRect().left) >= 0
		// 	// ) {
		// 	// 	moveRef.current.style.left =
		// 	// 		moveRef.current.getBoundingClientRect().width / 4 + "px";
		// 	// } else {
		// 	// 	moveRef.current.style.left =
		// 	// 		-moveRef.current.getBoundingClientRect().width / 4 + "px";
		// 	// }
		// 	// angle.set(angle.get());
		// }}

		// 	// angle.set(actualAngle);
		// 	// xVelocity.set(0);
		// }}
	>
		<Image
			src={bkgImage}
			alt="wood-table"
			fill
			style={{
				objectFit: "cover",
				maxWidth: "100%",
				borderRadius: "50%",
				zIndex: 5
			}}
			quality={40}
			priority
		/>
		<div ref={internal} className={styles["circular-border-internal"]}>
			<motion.ul
			// initial={{
			// 	opacity: 0.0
			// }}
			// animate={{
			// 	opacity: 1.0,
			// 	transition: {
			// 		duration: 0.5,
			// 		staggerChildren: 0.1
			// 	}
			// }}
			>
				{recipes.map((recipe, index) => {
					return (
						<motion.li
							key={recipe.id}
							className={styles["plate-container"]}
							id={recipe.id}
							ref={(node) => {
								const map = getMap();
								if (node) {
									map.set(recipe.title, node);
								} else {
									map.delete(recipe.title);
								}
							}}
							initial={{ opacity: 0 }}
							animate={{
								rotateZ: (Math.PI / 4) * (180 / Math.PI) * index,
								opacity: 1.0
							}}
						>
							<div className={styles["plate-image-container"]}>
								<Image
									style={
										settingsType !== "seasonal" ||
										(errorsReport.network && errorsReport.network !== null)
											? { transform: "translateX(0%)" }
											: { transform: "translateX(-20%)" }
									}
									className={
										// errorsReport.network &&
										// errorsReport.network !== null
										// 	? styles["plate-fallback"]
										// 	:
										styles["plate-image"]
									}
									src={
										errorsReport.network && errorsReport.network !== null
											? fallbackImg
											: recipe.image
									}
									alt={recipe.title}
									width="230"
									height="172"
									quality={100}
									priority={false}
								/>
							</div>
						</motion.li>
					);
				})}
			</motion.ul>
		</div>
	</motion.div>
</div>; */
}
