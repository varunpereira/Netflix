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
import {SearchIcon, MenuIcon, BellIcon} from "~/globe/asset/icon"
import logo from "~/globe/asset/logo.png"
// import Searcher from "~/search/searcher"

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

	var handler = () => width(view.width())

	return (
		<D
			style={() =>
				"z_put z-[2] c_null a_row my-[1.25rem] w_full v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]"
			}>
			<B click={() => nav("/")} style={() => "tc_1 tw_1 ts_3 mr-[2.5rem]"}>
				<P value={() => logo} style={() => `w-[6rem]`} />
			</B>
			<D style={() => `a_row ax_equal w_full tc_grey ts_1`}>
				<D style={() => `a_row ax_equal gap-[1rem] `}>
					{menu_options.map((v, i) => (
						<B
							click={() => opt_pick(i)}
							style={() => `hover:tc_white ${opt_pick() === i && `tc_white`}`}>
							{v}
						</B>
					))}
				</D>
				<D style={() => `a_row ax_equal gap-[1rem] `}>
					<SearchIcon style={() => `w-[1rem] h-[1rem] ic_white ibc_white iw_1`} />
					<T>KIDS</T>
					<T>DVD</T>
					<B style={() => `w-[1.25rem] h-[1.25rem] tc_white fill-white`}><BellIcon/></B>
				</D>
			</D>

			<B click={() => menu_click(!menu_click())}>
				<MenuIcon style={() => `v2:see v3:hide w-[1.75rem] h-[1.75rem] hover:ibc_grey`} />
			</B>
			{/* <D
				style={() =>
					`z_fit v2:z_put v2:z-[4] v2:c_null v2:a_row v2:ax_left v2:px-[1rem] v2:left-[0rem] v2:top-[2.5rem] v2:w_full v3:z_normal v3:px-[0rem] v3:w_fit`
				}></D> */}
		</D>
	)
}
