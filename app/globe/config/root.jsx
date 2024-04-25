import {render} from "solid-js/web"
import {Router, Routes, Route} from "@solidjs/router"
import "~/globe/config/style.scss"
import {page, D} from "~/globe/config/shop"
import logo from "~/globe/asset/logo_tab.png"
import Nav from "~/globe/config/nav"
import Footer from "~/globe/config/footer"
import def from "~/globe/config/def"
import home from "~/home/home"

var route = [
	["*", def],
	["/", home],
]

page.title = "Netflix"
page.getElementById("logo").href = logo
page.getElementById("color").content = "c_grey_2"
page.getElementById("style").className = "c_grey_2 tc_white ts_2 tf_1 min-w-[320px]"

render(
	() => (
		<Router>
			<D style={()=>`z_fit min-w-[20rem] v2:max-w-[60rem] v5:max-w-[150rem] mx_auto`}>
				<Nav />
				<Routes>
					{route?.map((route) => (
						<Route path={route[0]} component={route[1]} />
					))}
				</Routes>
				{/* <Footer /> */}
			</D>
		</Router>
	),
	page.getElementById("style"),
)
