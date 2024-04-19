"use client";

import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
	const [local, setLocal] = useState(() => {
		try {
			const value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : initialValue;
		} catch (error) {
			console.log(error);
		}
	});

	function setLocalStorage(value) {
		try {
			const valuetoArchieve = value instanceof Function ? value(local) : value;
			window.localStorage.setItem(key, JSON.stringify(valuetoArchieve));
			setLocal(value);
		} catch (error) {
			console.log(error);
		}
	}

	return [local, setLocalStorage];
}
