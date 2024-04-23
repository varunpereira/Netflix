import {
	state,
	react,
	construct,
	destruct,
	write,
	route,
	page,
	timer,
	req,
	D,
	T,
	B,
	V,
	P,
} from "~/globe/config/shop"

export default () => {
	var nav = route()

	construct(() => {
		page.title = `Page not found - iStuff`
	})

	react(() => {})

	return (
		<D style={() => `fit_1`}>
			<B click={() => nav("/")} style={() => "hover:tc_grey"}>
				Go Home
			</B>
		</D>
	)
}
