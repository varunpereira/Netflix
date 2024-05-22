import profiles from "~/config/db/profiles"
import shows from "~/config/db/shows"

var tables = {
	profiles,
	shows,
}

export var db = {
	get: (key) => tables[key],
	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value))
		return JSON.parse(localStorage.getItem(key))
	},
	cut: (key) => {
		localStorage.removeItem(key)
		return JSON.parse(localStorage.getItem(key))
	},
}
