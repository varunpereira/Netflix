import "~/globe/config/style.scss"
import {render} from "solid-js/web"
import {Router, Routes, Route} from "@solidjs/router"
import struct from "~/globe/config/struct"

document.title = struct()?.title()
document.getElementById("logo").href = struct()?.logo
document.getElementById("color").content = struct()?.color()
document.getElementById("style").className = struct()?.style()

render(
	() => (
		<Router>
			<div class="fit_1">
				{struct()?.nav()}
				<Routes>
					{struct()
						?.page()
						?.map((route) => (
							<Route path={route[0]} component={route[1]} />
						))}
				</Routes>
				{struct()?.footer()}
			</div>
		</Router>
	),
	document.getElementById("style"),
)
