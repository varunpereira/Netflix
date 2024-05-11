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
} from "~/config/shop"

export default () => {
	var nav = route()

	construct(() => {
		page.title = `404 - Netflix`
	})

	return (
		<D style={``}>
			<B click={() => nav("/")} style={() => "hover:tc_grey"}>
				Go Home
			</B>
		</D>
	)
}
