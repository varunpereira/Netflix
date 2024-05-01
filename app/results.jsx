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
	P,
	I,
	V,
} from "~/config/shop"

export default () => {
	var nav = route()

	construct(() => {
		page.title = ``
	})

	react(() => {})

	return <></>
}
