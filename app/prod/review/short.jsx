import {state, react, write, d, t, b, i, p, route, req, globe, dir} from "~/globe/shop"
import {star_icon} from "~/globe/asset/icon"

export default ({review}) => {
	var nav = route()
	var flaw = state()

	return d(
		{style: () => "c_white tc_black r_1 w-[12rem] h-[12rem] ts_1 p-[1rem] bw_1 bc_black"},
		t({}, () => review?.email),
		d(
			{style: () => "a_row"},
			() =>
				dir(review?.rating)
					.fill()
					.map((v, k) => star_icon({style: () => "w-[1rem] h-[1rem] ic_black"})),
			() =>
				dir(5 - review?.rating)
					.fill()
					.map((v, k) => star_icon({style: () => "w-[1rem] h-[1rem] ic_null ibc_black"})),
		),
		t({}, () => review?.description),
	)
}
