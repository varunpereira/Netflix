import {render} from "solid-js/web"
import {Router, Routes, Route} from "@solidjs/router"
import "~/config/style.scss"
import { page, D, write} from "~/config/shop"
import {show_nav, profile} from "~/config/state"
import {db} from "~/config/db"
import test from "~/test"
import Nav from "~/common/nav"
import Footer from "~/common/footer"
import def from "~/common/def"
import land from "~/generic/land"
import watch from "~/generic/watch"
import results from "~/generic/results"
import tv from "~/generic/tv"
import movies from "~/generic/movies"
import latest from "~/generic/latest"
import kids from "~/generic/kids"
import my_list from "~/generic/my_list"

var routes = [
	["*", def],
	["/test", test],
	["/", land],
	["/watch/:id", watch],
	["/search", results],
	["/tv", tv],
	["/movies", movies],
	["/latest", latest],
	["/kids", kids],
	["/mylist", my_list],
]

page.title = "Netflix"
page.getElementById("logo").href = "/config/logo_small.png"
page.getElementById("color").content = "c_grey_2"
page.getElementById("body").className = "c_grey_2 tc_white ts_2 tf_1 ay_top sx_mid"

var root = () => {
	profile(db?.get_auth())
	return (
		<Router>
			<D style={`w-full min-w-[20rem] v2:max-w-[60rem] v5:max-w-[120rem] z_fit z-[0]`}>
				{/* {profile() && show_nav() && <Nav />} */}
				<Routes>
					{routes?.map((route) => (
						<Route path={route[0]} component={route[1]} />
					))}
				</Routes>
				{/* <Footer /> */}
			</D>
		</Router>
	)
}

render(root, page.getElementById("body"))
