import profiles from "~/config/db/profiles"
import shows from "~/config/db/shows"
import home from "~/config/db/home"
import tv from "~/config/db/tv"
import movies from "~/config/db/movies"
import latest from "~/config/db/latest"

var tables = {
	profiles,
	shows,
	home,
	tv,
	movies,
	latest,
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
