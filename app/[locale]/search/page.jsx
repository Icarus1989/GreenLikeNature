import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SearchPrimaryComponent from "@/components/SearchPrimary/SearchPrimary";
import styles from "./page.module.css";

const apiKey = process.env.APIKEYSPOONTWO;

const i18nNamespaces = ["search"];

export async function searchByQuery(text, allergens) {
	"use server";

	// Aggiungere intolleranze
	const excludeIngredients =
		allergens.length > 0
			? `&excludeIngredients=${allergens
					.map((elem) => elem.toLowerCase())
					.join(",")}`
			: "";
	// const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text.toLowerCase()}&diet=vegetarian&fillIngredients=true${excludeIngredients}&number=50&instructionsRequired=true&addRecipeInformation=true&apiKey=${apiKey}`;
	const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text.toLowerCase()}&diet=vegetarian${excludeIngredients}&number=50&apiKey=${apiKey}`;
	const res = await fetch(url);
	const json = await res.json();
	return json;
}

export default async function SearchPage({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<main className={styles["main"]}>
				<SearchPrimaryComponent searchByQuery={searchByQuery} />
			</main>
		</TranslationsProvider>
	);
}
