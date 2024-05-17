var tables = {
	profiles: [
		{id: `Steve`, pic_link: `/icons/profile_green.jpg`},
		{id: `Bill`, pic_link: `/icons/profile_blue.jpg`},
		{id: `John`, pic_link: `/icons/profile_yellow.jpg`},
	],
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


