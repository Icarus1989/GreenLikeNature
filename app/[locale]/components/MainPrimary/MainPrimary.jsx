"use client";

import {
	useState,
	useEffect,
	useRef,
	useContext,
	Fragment,
	useCallback
} from "react";

import Image from "next/image";

import { useTranslation } from "react-i18next";

import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setError } from "@/lib/features/recipes/recipesSlice";

import {
	motion,
	AnimatePresence,
	useMotionValue,
	useVelocity,
	useMotionValueEvent,
	useMotionTemplate,
	useAnimate
} from "framer-motion";

import AnimatedText from "@/app/[locale]/components/AnimatedText/AnimatedText";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import SearchResult from "@/app/components/SearchResult/SearchResult";
import Flower from "@/app/[locale]/components/FlowerComponent/Flower";
import { Modal } from "@/app/[locale]/components/Modal/Modal";
import ErrorModal from "@/app/components/ErrorModal/ErrorModal";

import { great_vibes } from "@/app/utils/fonts/fonts";
import styles from "./MainPrimary.module.css";

import bkgImage from "@/public/retina-wood.svg";
import altImage from "@/public/plusCircleTrans.svg";
import fallbackImg from "@/public/tableNapkin.svg";
import { GoX } from "react-icons/go";

export default function MainPrimary({ defaultRecipes, searchByQuery }) {
	const { recipesList, seasonalRecipes, errorsReport } = useAppSelector(
		(state) => state.recipes
	);
	const reduxDispatch = useAppDispatch();

	const { t } = useTranslation();

	const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	const allergens =
		settings["tomato-settings"]["allergens-list"].length > 0
			? settings["tomato-settings"]["allergens-list"].map((elem) =>
					elem.toLowerCase()
			  )
			: [];

	const intolerances =
		settings["tomato-settings"]["intolerances-list"].length > 0
			? settings["tomato-settings"]["intolerances-list"].map((elem) =>
					elem.toLowerCase()
			  )
			: [];

	const [emptyInd, setEmptyInd] = useState([
		"Cerca una ricetta...",
		"Search for a recipe...",
		"Nach einem Rezept suchen...",
		"Zoek een recept...",
		"Rechercher une recette...",
		"Busca una receta...",
		"Procure uma receita...",
		"Sök efter ett recept..."
	]);

	const savedSettings = settings["saved-recipes"];
	const savedRecipes = createSavedList(savedSettings, defaultRecipes);

	const settingsType = settings["tomato-settings"]["recipes-type"];

	const [recipes, setRecipes] = useState(
		settingsType === "seasonal"
			? seasonalRecipes.length > 0
				? [...seasonalRecipes]
				: [...defaultRecipes]
			: savedRecipes
	);

	const [recipeData, setRecipeData] = useState({
		id: recipes[0]?.id,
		title: recipes[0]?.title,
		time: recipes[0]?.readyInMinutes,
		ingrNum: recipes[0]?.extendedIngredients.length,
		likes: recipes[0]?.likes
	});
	const [showModal, setShowModal] = useState(false);

	const [view, setView] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [searchData, setSearchData] = useState({
		type: "default",
		results: []
	});

	const errorsValues = Array.from(Object.values(errorsReport));
	const errorCheck = errorsValues.filter((elem) => elem !== null)[0] || null;
	const errorsMsgs = [];
	if (errorCheck) {
		for (const [key, value] of Object.entries(errorsReport)) {
			if (value !== null) {
				errorsMsgs.push({ from: key, message: value });
			}
		}
	}

	const [showError, setShowError] = useState(Boolean(errorCheck));

	const formRef = useRef(null);
	const carouselRef = useRef(null);
	// const flowerRef = useRef(null);

	const recipeRef = useRef(null);
	// const menuRef = useRef(null);
	const internal = useRef(null);

	const sectionRef = useRef(null);
	const moveRef = useRef(null);
	const titleRef = useRef(null);

	const filteredList = recipesList.filter((recipe) =>
		recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const theta = [
		0,
		Math.PI / 4,
		Math.PI / 2,
		3 * (Math.PI / 4),
		Math.PI,
		5 * (Math.PI / 4),
		3 * (Math.PI / 2),
		7 * (Math.PI / 4)
	];

	function createSavedList(list, defaultList) {
		const savedSet = new Set();

		defaultList.map((elem, index) => {
			if (list.at(index)) {
				savedSet.add(list.at(index));
			} else {
				const emptyElem = {
					...elem,
					id: Number(`-${elem.id}`),
					title: emptyInd[index],
					image: altImage.src
				};

				savedSet.add(emptyElem);
				return;
			}
		});
		return Array.from(savedSet);
	}

	function handleChange(event) {
		if (event.target.value.length > 0) {
			setView(true);
		} else {
			setView(false);
		}
		setSearchTerm(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (searchTerm.length > 0 && navigator.onLine) {
			// if (errorsReport?.network) {
			// 	reduxDispatch(setError({ name: "network", message: null }));
			// }
			try {
				const response = await searchByQuery(
					searchTerm,
					allergens,
					intolerances
				);
				if (response?.error) {
					reduxDispatch(setError({ name: "query", message: response.error }));
				}
				if (response["totalResults"] > 0) {
					setSearchData({ type: "positive", results: response["results"] });
				} else {
					setSearchData({ type: "empty", results: response["results"] });
				}
			} catch (error) {
				reduxDispatch(setError({ name: "submit", message: error.message }));
			}
		} else if (!navigator.onLine) {
			// reduxDispatch(
			// 	setError({ name: "network", message: "Check network connection." })
			// );
			setShowError(true);
		} else {
			return;
		}
	}

	const handleCloseTab = useCallback(() => {
		if (searchData.results.length > 0) {
			setSearchData({ type: "default", results: [] });
		}
		setSearchTerm("");
		setView(() => {
			return false;
		});
	}, [searchData.results.length]);

	// function handleAnimComplete() {
	// 	generalDispatch({
	// 		type: "title_animated"
	// 	});
	// }

	function getMap() {
		if (!recipeRef.current) {
			recipeRef.current = new Map();
		}
		return recipeRef.current;
	}

	function handleOpenDetails() {
		const actualRecipe = recipes.filter(
			(recipe) => recipe.title === titleRef.current.textContent
		)[0];
		setRecipeData({
			id: actualRecipe.id,
			title: actualRecipe.title,
			time: actualRecipe.readyInMinutes,
			ingrNum: actualRecipe.extendedIngredients.length,
			likes: actualRecipe.aggregateLikes
		});
		setShowModal(true);
	}

	function handleCloseDetails(text) {
		titleRef.current.textContent = text;
		setShowModal(false);
	}

	const angle = useMotionValue(0);
	const x = useMotionValue(0);
	const xVelocity = useVelocity(x);
	const angVelocity = useVelocity(xVelocity);

	// const leftMove = useMotionTemplate`${x}dvw`;

	// const [limits, setLimits] = useState({ min: null, max: null });

	// Plates Positioning Effect
	useEffect(() => {
		const searchbarDim = formRef.current.children[0].getBoundingClientRect();
		const searchbarCenterX = searchbarDim.left + searchbarDim.width / 2;
		const searchbarCenterY = searchbarDim.top + searchbarDim.height / 2;
		const carouselDim = carouselRef.current.getBoundingClientRect();
		const flowerDim = flowerRef.current.getBoundingClientRect();

		const sectionDim = sectionRef.current.getBoundingClientRect();
		// setLimits(() => {
		// 	return {
		// 		min: -sectionDim.width / 2,
		// 		max: sectionDim.width / 2
		// 	};
		// });

		// moveRef.current.style.width = sectionDim.width * 2 + "px";
		// moveRef.current.style.left = -sectionDim.width / 2 + 1 + "px";

		flowerRef.current.style.top =
			searchbarCenterY - flowerDim.height / 2 - 3 + "px";
		flowerRef.current.style.left =
			searchbarCenterX - flowerDim.width / 2 + "px";
		carouselRef.current.style.top =
			searchbarCenterY - carouselDim.height / 2 - 3 + "px";

		const measuresContainer = menuRef.current.getBoundingClientRect();
		const measuresInternal = internal.current.getBoundingClientRect();

		const hypY =
			(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
		const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

		function placePlate(itemId, index) {
			const map = getMap();
			const node = map.get(itemId);

			node.style.top =
				hypY * Math.sin(theta[index] + Math.PI / 2) -
				node.getBoundingClientRect().height / 2 +
				measuresInternal.height / 2 +
				"px";
			node.style.left =
				hypX * Math.cos(theta[index] + Math.PI / 2) -
				node.getBoundingClientRect().width / 2 +
				measuresInternal.width / 2 +
				"px";
		}

		recipes.map((recipe, index) => {
			return placePlate(recipe.title, index);
		});
	}, []);

	// Motion Transmission Effect

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

	const [recVelocity, setRecVelocity] = useState([]);

	function rotateAngle(value, range) {
		const sign = -value / value;
		const newAngle = angle.get() + range * sign;
		// console.log("angle");
		// console.log(angle.get());
		angle.set(newAngle);
		xVelocity.jump(0);
		// console.log(angle.get());
	}

	useMotionValueEvent(x, "animationStart", () => {
		// console.log(x.getVelocity());
		if (recVelocity.length === 0) {
			setRecVelocity((prevValue) => {
				return [...prevValue, x.getVelocity()];
			});
		}

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
	});

	useMotionValueEvent(x, "animationComplete", () => {
		console.log("angle end");
		// if (recVelocity[0] === 0) {
		// setRecVelocity((prevValue) => {
		// 	return (prevValue = []);
		// });
		recVelocity.length = 0;
		// }
	});

	// useMotionValueEvent(angle, "animation")

	console.log(recVelocity);

	const [menuRef, animate] = useAnimate();
	const [flowerRef, animateFlower] = useAnimate();

	useEffect(() => {
		// Funzione rotation

		// Spostare in useMotionValueEvent con x?

		// const difference = 45;

		// function rotateAngle(value, range) {
		// 	const sign = -value / value;
		// 	const newAngle = angle.get() + range * sign;
		// 	// console.log("angle");
		// 	// console.log(angle.get());
		// 	angle.set(newAngle);
		// 	// console.log(angle.get());
		// }
		// if (recVelocity.length > 0) {
		// 	;
		// }
		if (recVelocity[0] && recVelocity[0] !== 0) {
			const vel = recVelocity[0];
			// console.log("start");
			// rotateAngle(vel, difference);
			const difference = 45;
			// const sign = -vel / vel;
			// console.log("angle");
			// console.log(angle.get());
			const newAngle =
				vel > 0 ? angle.get() - difference : angle.get() + difference;
			animate(menuRef.current, { rotateZ: `${newAngle}deg` });
			animateFlower(flowerRef.current, { rotateZ: `${newAngle}deg` });
			angle.set(newAngle);
			// setRecVelocity((prevValue) => {
			// 	return (prevValue = []);
			// });
			// setRecVelocity((prevValue) => {
			// 	return (prevValue.length = 0);
			// });
		} else {
			return;
		}

		return () => {
			if (recVelocity.length > 0) {
				recVelocity.length = 0;
			}
			xVelocity.set(0);
		};
	}, [recVelocity[0]]);

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

	// Movement and Title Detect

	const invertedRecipes = [recipes[0], ...recipes.slice(1).reverse()];

	// const sinValues = theta.map((rad) => Math.sin(rad));
	// console.log(sinValues);

	useMotionValueEvent(angle, "change", (lastAngle) => {
		// console.log(x.get());
		// console.log(lastAngle);
		// if (angle.get() >= 360) {
		// 	x.set(-3 * sectionRef.current.getBoundingClientRect().width);
		// } else if (angle.get() <= -360) {
		// 	x.set(-3 * sectionRef.current.getBoundingClientRect().width);
		// }

		// if (angle.get() >= 360) {
		// 	angle.set(0);
		// } else if (angle.get() <= -360) {
		// 	angle.set(0);
		// }

		// console.log("Angle");
		// console.log(angle.get());
		// console.log(
		// 	// Math.sin(45 * (Math.PI / 180)) === Math.sin(405 * (Math.PI / 180))
		// 	angle.get() % 360
		// );
		// for (let rad of sinValues) {
		// 	if (Math.sin(angle.get() * (Math.PI / 180)) === rad) {
		// 		console.log("HERE ---> " + rad);
		// 	}
		// }

		if (lastAngle >= 0) {
			// const actualVel = xVelocity.get();

			theta.map((piSection, index) => {
				// test --->
				// if (Math.sin(angle.get() * (Math.PI / 180)) === Math.sin(piSection)) {
				// 	const h4Title = titleRef.current.textContent;
				// 	const actualTitle = invertedRecipes[index].title;
				// 	h4Title !== actualTitle
				// 		? (titleRef.current.textContent = invertedRecipes[index].title)
				// 		: null;
				// }
				// for (let sinValue of sinValues) {

				// if (Math.round(lastAngle) % 22.5 === 0) {
				// 	// stop if plate max proximity
				// 	xVelocity.set(0);
				// 	// set perfect angle if plate max proximity
				// 	angle.set(Math.round(lastAngle));
				// 	// x.set(x.get());
				// }

				// if (Math.round(angle.get()) % 22.5 === 0) {
				// console.log("Angle");
				// console.log(angle.get());
				// console.log(
				// 	Math.sin(angle.get() * (Math.PI / 180)) === Math.sin(piSection)
				// );
				// if (Math.sin(angle.get() * (Math.PI / 180)) === Math.sin(piSection)) {
				// 	console.log("HERE ---> " + piSection);
				// }
				// }

				// }

				if (
					((lastAngle % 360) - 15) * (Math.PI / 180) <= piSection &&
					piSection <= ((lastAngle % 360) + 15) * (Math.PI / 180)
				) {
					// <----- testing here

					// slow if plate proximity
					// console.log("Angle");
					// console.log(angle.get());
					// console.log("angle sin");
					// console.log(Math.sin(angle.get() * (Math.PI / 180)));
					// console.log("PI section");
					// console.log(piSection);
					// console.log("section sin");
					// console.log(Math.sin(piSection));

					// testing here --->
					// xVelocity.set(actualVel * 0.235);

					// change title if plate proximity

					const h4Title = titleRef.current.textContent;
					const actualTitle = invertedRecipes[index].title;
					h4Title !== actualTitle
						? (titleRef.current.textContent = invertedRecipes[index].title)
						: null;
					// if (Math.round(lastAngle) % 22.5 === 0) {
					// 	// stop if plate max proximity
					// 	xVelocity.set(0);
					// 	// set perfect angle if plate max proximity
					// 	angle.set(Math.round(lastAngle));
					// 	// x.set(x.get());
					// }
				}
			});
		} else if (lastAngle < 0) {
			// const actualVel = xVelocity.get();
			theta.map((piSection, index) => {
				if (
					((lastAngle % 360) + 15) * (Math.PI / 180) >= -piSection &&
					-piSection >= ((lastAngle % 360) - 15) * (Math.PI / 180)
				) {
					// <----- testing here
					// xVelocity.set(actualVel * 0.235);

					// console.log("Angle");
					// console.log(angle.get());
					// console.log("PI section");
					// console.log(piSection);
					// console.log("section sin");
					// console.log(Math.sin(piSection));

					const h4Title = titleRef.current.textContent;
					const actualTitle = recipes[index].title;
					h4Title !== actualTitle
						? (titleRef.current.textContent = recipes[index].title)
						: null;
					// if (Math.round(lastAngle) % -22.5 < 0.1) {
					// 	angle.set(Math.round(lastAngle));
					// 	// x.set(x.get());
					// 	xVelocity.set(0);
					// }
				}

				return;
			});
		}
	});

	// Test --->

	// useMotionValueEvent(x, "change", (lastX) => {
	// 	console.log(lastX);
	// });

	// <--- Test

	// Blur Effect
	useEffect(() => {
		if (view === true) {
			window.addEventListener("blur", handleCloseTab);
			// setSearchData({ type: "default", results: [] });
			return () => {
				window.removeEventListener("blur", handleCloseTab);
			};
		}
	}, [view, handleCloseTab]);

	return (
		<>
			<motion.section
				ref={sectionRef}
				className={`${styles["container"]} ${great_vibes.variable}`}
				dir="ltr"
				onContextMenu={(event) => event.preventDefault()}
				// onTapStart={() => {
				// 	// const actualAngle = angle.get();
				// 	x.set(0);
				// 	// angle.set(actualAngle);
				// 	// xVelocity.set(0);
				// }}
			>
				<motion.div
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
				></motion.div>

				<div id="circ-hole" className={styles["title-search-part"]}>
					<div className={styles["title-container"]}>
						<AnimatedText
							text={`Green Like Nature`}
							className={styles["title-general"]}
							// handleAnimComplete={handleAnimComplete}
							// handleAnimComplete={true}
						></AnimatedText>
					</div>
					<motion.div
						ref={flowerRef}
						// style={{ position: "fixed", rotateZ: angle }}
						style={{ position: "fixed" }}
						className={styles["flower-container"]}
						// initial={{
						// 	opacity: 0
						// }}
						// animate={{
						// 	opacity: 1.0,
						// 	transition: { duration: 0.5, delay: 1.0 }
						// }}
					>
						<Flower />
					</motion.div>
					{/* <--- centrare */}
					{/* <--- utilizzare una prop per trasmattere...
					rotateZ */}
					{/* <--- test */}
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className={styles["search-part"]}
					>
						<SearchBar
							id="searchBar"
							value={searchTerm}
							position="absolute"
							handleChange={handleChange}
						/>
					</form>
					{view && (
						<>
							<motion.div
								initial={{
									opacity: 0.0,
									y: 800
									// <--- modificare per adattare ad altre dimensioni
								}}
								animate={{
									opacity: 1.0,
									y: 0,
									transition: {
										duration: 0.5
									}
								}}
								className={styles["results-part"]}
							>
								<motion.button
									className={styles["cancel-btn"]}
									onClick={handleCloseTab}
								>
									<GoX className={styles["x-icon"]} />
								</motion.button>
								<div className={styles["results"]}>
									{searchData.type === "positive" ||
									searchData.type === "empty" ? (
										<ul className={styles["list"]}>
											{" "}
											{/* controllare traduzione i18 qui ---> */}
											<span className={styles["list-label"]}>
												{searchData.type === "positive" &&
													t("results_label", { searchTerm })}
												{searchData.type === "empty" &&
													t("no_results_label", { searchTerm })}
											</span>
											{searchData.type === "positive" &&
												searchData["results"].map((elem) => {
													const recipePresence =
														recipesList.filter(
															(recipe) => recipe.id === elem.id
														).length > 0;
													return (
														<Fragment key={elem.id}>
															<SearchResult
																id={elem.id}
																title={elem.title}
																image={elem.image}
																saved={recipePresence}
															/>
														</Fragment>
													);
												})}
										</ul>
									) : filteredList.length > 0 ? (
										<ul className={styles["list"]}>
											{" "}
											<span className={styles["list-label"]}>
												Suggerimenti:
											</span>
											{filteredList.map((elem) => {
												const recipePresence =
													recipesList.filter((recipe) => recipe.id === elem.id)
														.length > 0;
												return (
													<Fragment key={elem.id}>
														<SearchResult
															id={elem.id}
															title={elem.title}
															image={elem.image}
															saved={recipePresence}
														/>
													</Fragment>
												);
											})}
										</ul>
									) : (
										<p className={styles["no-suggest-label"]}>
											{t("no_suggestion_label")}
										</p>
									)}
								</div>
							</motion.div>
						</>
					)}
				</div>
				<div className={styles["carousel-container"]}>
					<motion.div
						initial={{
							opacity: 0
						}}
						animate={{
							opacity: 1.0,
							transition: { duration: 0.5, delay: 0 }
						}}
						ref={carouselRef}
						className={styles["carousel"]}
					>
						<div className={styles["circular-container"]}>
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
								<div
									ref={internal}
									className={styles["circular-border-internal"]}
								>
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
																(errorsReport.network &&
																	errorsReport.network !== null)
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
																errorsReport.network &&
																errorsReport.network !== null
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
						</div>
					</motion.div>
				</div>
				<div className={styles["recipe-title-container"]}>
					<h4
						ref={titleRef}
						className={
							showModal
								? styles["recipe-title-modal"]
								: styles["recipe-title-label"]
						}
					>
						{recipeData.title}
					</h4>
				</div>
				<AnimatePresence>
					{showModal ? (
						<Modal
							key={recipeData.id}
							id={recipeData.id}
							title={recipeData.title}
							time={recipeData.time}
							ingrNum={recipeData.ingrNum}
							likes={recipeData.likes}
							onClick={handleCloseDetails}
							ref={titleRef}
						/>
					) : (
						<motion.div
							key={`${recipeData.id}text`}
							className={styles["text-container"]}
						>
							<p className={styles["text-info"]}>
								{settingsType === "seasonal" &&
									(seasonalRecipes.length > 0
										? `${t("suggest_seasonal")}`
										: `${t("suggest_default")}`)}
								{settingsType === "saved" &&
									(savedRecipes.length > 0
										? `${t("suggest_saved")}`
										: `${t("suggest_default")}`)}
							</p>
							{/* Controllare traduzione qui per ricette salvate */}
							<button
								onClick={handleOpenDetails}
								className={styles["modal-btn"]}
							>
								{t("details_btn")}
							</button>
						</motion.div>
					)}
				</AnimatePresence>
				{showError && (
					<ErrorModal
						errorsList={errorsMsgs}
						onClick={() => setShowError(false)}
					/>
				)}
			</motion.section>
		</>
	);
}
