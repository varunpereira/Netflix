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
} from "~/config/shop"
import {SearchIcon, MenuIcon, BellIcon, DownTriangleIcon} from "~/pieces/icon"
// import Searcher from "~/search/searcher"

export default () => {
	var width = state()
	var nav = route()
	var acc_click = state(false)
	var menu_click = state(false)
	var menu_options = ["Home", "TV Shows", "Movies", "Latest", "My List"]
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
				<img src={'/logo.png'} class={`w-[6rem]`} />
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
				<D style={() => `a_row ax_equal gap-[1.2rem] `}>
					<B style={() => `w-[1.25rem] h-[1.25rem] ic_white stroke-[2rem] `}>
						<SearchIcon />
					</B>
					<T>Kids</T>
					<B style={() => `w-[1.5rem] h-[1.5rem] stroke-white fill-white mt-[-.2rem]`}>
						<BellIcon />
					</B>
					<B style={() => `a_row`}>
						<img src={`/profile.jpg`} class={`w-[1.75rem] h-[1.75rem] mt-[-.4rem] mr-[.5rem]`} />
						<div class={`w-[.8rem] h-[.4rem] ic_white a_row mt-[.5rem]`}>
							<DownTriangleIcon />
						</div>
					</B>
				</D>
			</D>

			<B click={() => menu_click(!menu_click())}>
				<MenuIcon style={() => `v2:see v3:hide w-[1.75rem] h-[1.75rem] hover:ibc_grey`} />
			</B>
			{/* <D
				style={() =>
					`z_fit z-[2] v2:z_put v2:z-[4] v2:c_null v2:a_row v2:ax_left v2:px-[1rem] v2:left-[0rem] v2:top-[2.5rem] v2:w_full v3:z_normal v3:px-[0rem] v3:w_fit`
				}></D> */}
		</D>
	)
}
