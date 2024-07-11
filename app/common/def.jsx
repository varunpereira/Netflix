import {
	state,
	react,
	construct,
	destruct,
	write,
	path,
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
	var nav = path?.nav()

	construct(() => {
		page.title = `404 - Netflix`
	})

	return (
		<D style={`fit_1 ax_mid sx_mid ot=10`}>
			<T>Page Not Found </T>
			<B click={() => nav("/")} style={`ol=.3 tc_red`}>
				Go Home
			</B>
		</D>
	)
}
