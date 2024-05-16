"use client";

import { useState, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { i18nConfig } from "@/i18nConfig";

import { useParams } from "next/navigation";

import TomatoLeaf from "../TomatoLeaf/TomatoLeaf";

import { MdLanguage } from "react-icons/md";

import styles from "./LanguageOption.module.css";

export default function LanguageOption({ onStartAnim }) {
	const { i18n } = useTranslation();
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	const { t } = useTranslation();
	const params = useParams();

	const [lang, setLang] = useState(params.locale);

	function handleChange(event) {
		const newLocale = event.target.value;

		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.prefixDefault
		) {
			router.push("/" + newLocale + currentPathname);
		} else {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
			);
		}

		setLang(() => newLocale);
		router.refresh();
	}

	return (
		<form className={styles["languages-form"]}>
			<fieldset onFocus={onStartAnim} className={styles["languages-fieldset"]}>
				<legend className={styles["languages-legend"]}>
					<TomatoLeaf />
					{<MdLanguage className={styles["legend-svg"]} />}
				</legend>
				<p className={styles["languages-intro"]}>{t("intro_languages")}</p>
				<div className={styles["radios-container"]}>
					{i18nConfig.locales.map((langAbbr) => {
						return (
							<Fragment key={`lang${langAbbr}`}>
								<label className={styles["language-label"]}>
									<input
										type="radio"
										checked={langAbbr === lang}
										onChange={(event) => handleChange(event)}
										name={`radioBtn${langAbbr.toUpperCase()}`}
										value={langAbbr}
									/>
									{t(`${langAbbr.toUpperCase()}_label`)}
								</label>
							</Fragment>
						);
					})}
				</div>
			</fieldset>
		</form>
	);
}
