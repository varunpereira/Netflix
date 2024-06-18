import {render} from "solid-js/web"
import {Router, Routes, Route} from "@solidjs/router"
import "~/config/style.scss"
import { page, D, write} from "~/config/shop"
import {show_nav, profile} from "~/config/state"
import {db} from "~/config/db"
import Nav from "~/pieces/nav"
import Footer from "~/pieces/footer"
import def from "~/pieces/def"
import land from "~/land"
import watch from "~/watch"
import results from "~/results"
import tv from "~/tv"
import movies from "~/movies"
import latest from "~/latest"
import test from "~/test"

var routes = [
	["*", def],
	["/test", test],
	["/", land],
	["/watch/:id", watch],
	["/search", results],
	["/tv", tv],
	["/movies", movies],
	["/latest", latest],
]

page.title = "Netflix"
page.getElementById("logo").href = "/config/logo_small.png"
page.getElementById("color").content = "c_grey_2"
page.getElementById("style").className = "c_grey_2 tc_white ts_2 tf_1 ay_top sx_mid"

var root = () => {
	profile(db?.get_auth())
	return (
		<Router>
			<D style={`w-full min-w-[20rem] v2:max-w-[60rem] v5:max-w-[120rem] z_fit z-[0]`}>
				{profile() && show_nav() && <Nav />}
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

render(root, page.getElementById("style"))
