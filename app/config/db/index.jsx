import profiles from "~/config/db/profiles"
import shows from "~/config/db/shows"
import home from "~/config/db/home"
import tv from "~/config/db/tv"
import movies from "~/config/db/movies"
import latest from "~/config/db/latest"
import kids from "~/config/db/kids"
import my_list from "~/config/db/my_list"

var tables = {
	profiles,
	shows,
	home,
	tv,
	movies,
	latest,
	kids,
	my_list,
}

export var db = {
	get_auth: () => JSON.parse(localStorage.getItem(`profile`)),
	get_all: (key) => tables[key],
	get_one_by_id: (key, id) => tables[key]?.filter((v) => v?.id === id)[0],
	set_all: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value))
		return JSON.parse(localStorage.getItem(key))
	},
	cut_all: (key) => {
		localStorage.removeItem(key)
		return JSON.parse(localStorage.getItem(key))
	},
}
