import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";

import SettingsPrimary from "@/app/[locale]/profile/components/SettingsPrimary/SettingsPrimary";
import styles from "./page.module.css";
import {
	getSpoonData,
	translateToEng,
	translateList
} from "../../serverActions/ServerActions";

const i18nNamespaces = ["profile"];

export default async function SettingsPage({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<main className={styles["main"]}>
				<SettingsPrimary
					translateToEng={translateToEng}
					translateList={translateList}
					getSpoonData={getSpoonData}
				/>
			</main>
		</TranslationsProvider>
	);
}
