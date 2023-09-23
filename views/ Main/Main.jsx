"use-client";

// import React, { useState, useEffect } from "react";
// import SearchBar from "../../components/SearchBar/SearchBar";
import CarouselsContainer from "@/components/carouselContainer/CarouselsContainer";
import styles from "./Main.module.css";

export default function Main() {
	return (
		<>
			<main className={styles.mainElement}>
				<CarouselsContainer />
			</main>
		</>
	);
}
