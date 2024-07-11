import {
	state,
	react,
	construct,
	destruct,
	path,
	write,
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
	var nav = path?.nav()

	construct(() => {
		page.title = ``
	})

	return <D v1={`fit_1`}></D>
}
