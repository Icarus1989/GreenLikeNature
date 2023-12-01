"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";
import { TbWorldHeart } from "react-icons/tb";
// import { GrRestaurant } from "react-icons/gr";
import { LuClock12, LuChefHat } from "react-icons/lu";
import RapidLink from "@/components/RapidLink/RapidLink";

import GeneralLoading from "../loading";
import SearchLoading from "./loading";
import PreferencesLoading from "../profile/loading";

export default function SearchPage() {
	const [text, setText] = useState("hello");
	// Here
	return (
		<section className={styles["container"]}>
			<div className={styles["search-part"]}>
				{/* <h2>Search Page</h2> */}
				<SearchBar position="static" />
			</div>
			<div className={styles["results-part"]}>
				<RapidLink
					title="Con frutta e verdura di stagione"
					icon={<TbWorldHeart />}
				/>
				<RapidLink title="Ricette suggerite" icon={<LuChefHat />} />
				<RapidLink title="Per pranzo" icon={<LuClock12 />} />
				<div className={styles["anim-plant-container"]}></div>
			</div>
			{/* <PreferencesLoading /> */}
			{/* GeneralLoading Testing */}
		</section>
	);
}
