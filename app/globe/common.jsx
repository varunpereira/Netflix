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
} from "~/globe/shop"

export default () => {
	var nav = route()

	construct(() => {
		page.title = ``
	})

	react(() => {})

	return <></>
}
