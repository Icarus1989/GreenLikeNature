"use client";

import { Fragment, useRef } from "react";
import parse from "html-react-parser";
import styles from "./SingleRecipe.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { PiClockCountdownBold, PiUserBold } from "react-icons/pi";
// import { Remarkable } from "remarkable";

// const md = new Remarkable();

// function renderMarkdownToHTML(markdown) {
// 	const renderedHTML = md.render(markdown);
// 	return { __html: renderedHTML };
// }

// function RawHTMLReader({ markdown }) {
// 	const markup = renderMarkdownToHTML(markdown);
// 	return <div dangerouslySetInnerHTML={markup}></div>;
// }

// const pTag = useRef(null);

// function ReaderComponent(description) {
// 	return <p ref={pTag}>{description}</p>;
// }

export default function SingleRecipe({ data }) {
	console.log(data);

	// const p = useRef(null);
	// p.insertAdjacentHTML("afterbegin", data.summary);

	// console.log(p);

	// const parsedSummary = parse(data.summary);
	const newSummary = data.summary.replaceAll(/\./g, ".\n");
	// <--- riprovare
	// console.log(newSummary);
	const cleanSummary = parse(newSummary, {
		replace(domNode) {
			// console.dir(domNode, { depth: null });
			if (domNode.name === "a") {
				return <b>{domNode.children[0].data}</b>;
			}
		}
	});

	// const
	return (
		<section className={styles["single-recipe"]}>
			<button className={styles["undo-btn"]}>
				<Link href="/search">
					<FaArrowLeft />
				</Link>
			</button>
			{/* Aggiungere IMG section con IMG */}
			<h1 className={styles["main-title"]}>{data.title}</h1>

			{/* <textarea content={data.summary}></textarea> */}
			<div className={styles["info-container"]}>
				<div className={styles["first-info"]}>
					<div className={styles["image-container"]}>
						<img className={styles["image"]} src={data.image} />
					</div>
					<p className={styles["time"]}>
						{<PiClockCountdownBold />} <span>{data.readyInMinutes}'</span>
					</p>
					<p className={styles["servings"]}>
						{<PiUserBold />} <span>{data.servings}</span>
					</p>
				</div>
			</div>
			<div className={styles["recipe-presentation"]}>
				<h3 className={styles["section-title"]}>Presentazione:</h3>
				<summary className={styles["recipe-summary"]}>
					{/* {data.summary.replace(/(<([^>]+)>)/gi, "")} */}
					{cleanSummary}
				</summary>
			</div>
			<div className={styles["ingredients"]}>
				<h3 className={styles["section-title"]}>Ingredienti:</h3>
				<ul className={styles["total-ingrediets"]}>
					{data.extendedIngredients.map((ingridient, index) => {
						return (
							<li
								key={`${ingridient.id}${index}`}
								className={styles["ingredient"]}
							>
								{ingridient.name}
							</li>
						);
					})}
				</ul>
			</div>

			<div className={styles["instructions-container"]}>
				<h3 className={styles["section-title"]}>Preparazione:</h3>
				<ul className={styles["instructions-list"]}>
					{data.analyzedInstructions[0].steps.map((step) => {
						console.log(step);
						return (
							<li key={`number${step.number}`} className={styles["step"]}>
								<h4 className={styles["step-title"]}>
									Passo {step.number} /{" "}
									{data.analyzedInstructions[0].steps.length}
								</h4>
								{step.equipment.length > 0 && (
									<div className={styles["equipment"]}>
										<h5 className={styles["equipment-title"]}>+ Strumenti:</h5>
										<ul className={styles["equipment-list"]}>
											{step.equipment.map((tool) => {
												// console.log(tool);
												return (
													<li className={styles["tool-elem"]} key={tool.name}>
														<p className={styles["tool-name"]}>
															{tool.name}
															{tool.temperature &&
																` - temperatura: ${tool.temperature.number}° ${tool.temperature.unit}`}
														</p>
													</li>
												);
											})}
										</ul>
									</div>
								)}
								{step.ingredients.length > 0 && (
									<div className={styles["step-ingredients"]}>
										<h5 className={styles["ingredients-title"]}>
											+ Ingredienti:
										</h5>
										<ul className={styles["ingredients-list"]}>
											{step.ingredients.map((ingr, index) => {
												return (
													<li
														className={styles["ingredient-name"]}
														key={`${ingr.id}${index}`}
													>
														{ingr.name}
													</li>
												);
											})}
										</ul>
									</div>
								)}
								<p className={styles["step-text"]}>{step.step}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
