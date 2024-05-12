import {render} from "solid-js/web"
import {Router, Routes, Route,} from "@solidjs/router"
import "~/config/style.scss"
import {show_nav} from "~/config/state"
import {page, D} from "~/config/shop"
import Nav from "~/pieces/nav"
import Footer from "~/pieces/footer"
import def from "~/pieces/def"
import land from "~/land"
import watch from "~/watch"
import results from "~/results"

var route = [
	["*", def],
	["/", land],
	["/watch/:id", watch],
	["/search", results],
]

page.title = "Netflix"
page.getElementById("logo").href = "/config/logo_tab.png"
page.getElementById("color").content = "c_grey_2"
page.getElementById("style").className = "c_grey_2 tc_white ts_2 tf_1"

var root = () => {
	
	return (
		<Router>
			<D style={`min-w-[20rem] v2:max-w-[60rem] v5:max-w-[120rem] mx_auto z_fit z-[0]`}>
				{show_nav() && <Nav />}
				<Routes>
					{route?.map((route) => (
						<Route path={route[0]} component={route[1]} />
					))}
				</Routes>
				{/* <Footer /> */}
			</D>
		</Router>
	)
}

render(root, page.getElementById("style"))
