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
		<D style={`fit_1 ax_mid sx_mid mt-[10rem]`}>
			<T style={``}>Page Not Found - </T>
			<B click={() => nav("/")} style={"ml-[.3rem] hover:tc_grey"}>
				Go Home
			</B>
		</D>
	)
}
