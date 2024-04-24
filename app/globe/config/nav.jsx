import {
	state,
	react,
	construct,
	destruct,
	write,
	route,
	view,
	req,
	D,
	T,
	B,
	V,
	P,
} from "~/globe/config/shop"
import {shop_icon, menu_icon, cart_icon, sign_in_icon} from "~/globe/asset/icon"
import Searcher from "~/search/searcher"
import logo from "~/globe/asset/logo.png"

export default () => {
	var width = state()
	var nav = route()
	var acc_click = state(false)
	var menu_click = state(false)
	var menu_options = ["Home", "TV Shows", "Movies", "New & Popular", "My List"]
	var opt_pick = state(0)

	construct(async () => {
		// write(globe())
		width(view.width())
		view.put_listen("resize", handler)
	})

	destruct(() => {
		view.cut_listen("resize", handler)
	})

	react(() => {})

	var handler = () => {
		width(view.width())
	}

	var sign_out = async () => {
		var res = await req("/login/auth_cut")
		if (res?.flaw != null) {
			return
		}
		nav_full("/signin")
	}

	return (
		<D
			style={() =>
				"z_put z-[2] c_null a_row my-[1.25rem] w_full v2:px-[1rem] v3:px-[5rem] v4:px-[10rem]"
			}>
			<B click={() => nav("/")} style={() => "tc_1 tw_1 ts_3 mr-[2rem]"}>
				<P value={() => logo} style={() => `w-[4rem]`} />
			</B>
			<D style={() => `a_row ax_equal gap-[1rem] tc_grey ts_1`}>
				{menu_options.map((v, i) => (
					<B
						click={() => opt_pick(i)}
						style={() => `hover:tc_white ${opt_pick() === i && `tc_white`}`}>
						{v}
					</B>
				))}
			</D>
			{/* <Searcher /> */}
			<B click={() => menu_click(!menu_click())}>
				{menu_icon({style: () => "v2:see v3:hide w-[1.75rem] h-[1.75rem] hover:ibc_grey"})}
			</B>
			<D
				style={() =>
					`z_fit v2:z_put v2:z-[4] v2:c_null v2:a_row v2:ax_left v2:px-[1rem] v2:left-[0rem] v2:top-[2.5rem] v2:w_full v3:z_normal v3:px-[0rem] v3:w_fit`
				}></D>
		</D>
	)
}
