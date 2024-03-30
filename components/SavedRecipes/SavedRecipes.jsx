"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import TomatoLeaf from "../TomatoLeaf/TomatoLeaf";
import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";
import styles from "./SavedRecipes.module.css";
import { GoX, GoBookmark } from "react-icons/go";

export default function SavedRecipes({ onClick }) {
	const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	function handleRemove(id) {
		generalDispatch({
			type: "delete",
			id: id
		});
	}

	function handleClear() {
		generalDispatch({
			type: "clear"
		});
	}

	return (
		<div className={styles["saved-recipes-container"]} onClick={onClick}>
			<fieldset className={styles["saved-recipes-fieldset"]}>
				<legend className={styles["saved-recipes-legend"]}>
					<TomatoLeaf />
					{<GoBookmark className={styles["legend-svg"]} />}
				</legend>
				{settings["saved-recipes"].length > 0 ? (
					<>
						<p className={styles["description"]}>
							Gestisci le Ricette Salvate:
						</p>
						<ul className={styles["saved-recipes-list"]}>
							{settings["saved-recipes"].map((recipe, index) => (
								<li id={recipe.id} key={`${recipe.name}${index}`}>
									<div className={styles["recipe-img-container"]}>
										<Image
											src={recipe.image}
											className={styles["recipe-img"]}
											width="556"
											height="320"
											alt={`${recipe.name} image`}
										/>
									</div>
									<span>
										{recipe.title.length >= 30
											? `${recipe.title.slice(0, 29)}...`
											: recipe.title}
									</span>
									<button
										onClick={() => {
											return handleRemove(recipe.id);
										}}
									>
										<GoX />
									</button>
								</li>
							))}
						</ul>
						<div className={styles["clear-list-container"]}>
							<button
								className={styles["clear-recipes-list"]}
								onClick={() => {
									// onClick();
									return handleClear();
								}}
							>
								<GoX /> Cancella Lista
							</button>
						</div>
					</>
				) : (
					<p className={styles["description"]}>
						Nessuna ricetta é stata ancora salvata.
						<br />
						<br />
						Cerca tra le ricette disponibili le tue preferite fino ad un massimo
						di 8.
					</p>
				)}
			</fieldset>
		</div>
	);
}

// cambiare nome prop in arrivo in handleClick
