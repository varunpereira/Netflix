import {
	state,
	react,
	write,
	d,
	t,
	b,
	i,
	p,
	route,
	req,
	globe,
	dir,
	num,
} from "~/shop"
import {right_icon, left_icon} from "~/pieces/icon"

export default ({cur, size, link}) => {
	var nav = route()
	var flaw = state()

	return d(
		{style: () => "c_white tc_black r_1 ts_1 h_fit w_fit a_row ay_mid"},
		b(
			{
				style: () => "px-[.2rem]",
				click: () => (cur() >= 2 ? nav(link() + "/" + (num(cur()) - 1)) : ""),
			},
			left_icon({style: () => "w-[1.2rem] h-[1.2rem]"}),
		),
		() =>
			dir(size())
				.fill()
				.map((v, k) =>
					b(
						{
							click: () => nav(link() + "/" + (k + 1)),
							style: () =>
								"w-[2rem] h-[2rem] hover:c_grey ta_mid bw_1 bc_grey pt-[0rem] " +
								(k + 1 === num(cur()) ? "c_grey" : ""),
						},
						() => k + 1,
					),
				),
		b(
			{
				style: () => " px-[.2rem]",
				click: () => (cur() < size() ? nav(link() + "/" + (num(cur()) + 1)) : ""),
			},
			right_icon({style: () => "w-[1.2rem] h-[1.2rem]"}),
		),
	)
}
