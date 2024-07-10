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
			<T style={`or=2.5`}>Page Not Found </T>
			<B click={() => nav("/")} style={"ol=.3 hover:tc_grey"}>
				Go Home
			</B>
		</D>
	)
}
