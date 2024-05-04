import {
	state,
	react,
	construct,
	destruct,
	write,
	route,
	view,
	req,
	path,
	page,
	D,
	T,
	B,
	V,
	P,
	I,
} from "~/config/shop"
import {SearchIcon, MenuIcon, BellIcon, DownTriangleIcon, CrossIcon} from "~/pieces/icon"

export default () => {
	var width = state()
	var nav = route()
	var acc_click = state(false)
	var menu_click = state(false)
	var menu_options = ["Home", "TV Shows", "Movies", "Latest", "My List", "Kids"]
	var opt_pick = state(0)
	var see_search = state(false)
	var see_profile_list = state(false)
	var form_data = state({search: ""})
	var search_field

	construct(async () => {
		width(view.width())
		view.put_listen("resize", handler)
	})

	destruct(() => {
		view.cut_listen("resize", handler)
	})

	var form_submit = async () => {
		get_results()
	}

	var handler = () => width(view.width())

	var get_results = () => {
		form_data().search.trim() !== "" && nav("/search?q=" + form_data().search)
	}

	return (
		<D
			style={() =>
				"z_put z-[2] c_null a_row my-[1.25rem] w_full v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]"
			}>
			<B click={() => nav("/")} style={() => "tc_1 tw_1 ts_3 mr-[2.5rem]"}>
				<img src={"/config/logo.png"} class={`w-[6rem]`} />
			</B>
			<D style={() => `a_row ax_equal w_full tc_grey ts_1`}>
				<D style={() => `a_row ax_equal gap-[1rem] `}>
					{menu_options.slice(0, -1).map((v, i) => (
						<B
							click={() => opt_pick(i)}
							style={() => `hover:tc_white ${opt_pick() === i && `tc_white`}`}>
							{v}
						</B>
					))}
				</D>
				<D style={() => `a_row ax_equal gap-[1.2rem] z_fit`}>
					<div
						style={"transition:width 1s;"}
						class={
							!see_search()
								? "a_row items-center w-[0rem] h-[0rem] border-[0rem] border-white px-[.1rem] c_black"
								: "a_row items-center w-[14rem] h-[1.7rem] c_black border-[.1rem] border-white px-[.1rem]"
						}>
						<B
							click={() => {
								form_submit(form_data().search)
							}}
							style={() => `w-[1.25rem] h-[1.25rem] ic_white stroke-[2rem]  `}>
							<SearchIcon />
						</B>
						<I
							ref={search_field}
							value={() => form_data().search}
							input={(e) => {
								form_data({...form_data(), search: e.target.value})
								get_results()
							}}
							holder={() => "Title, people, genres"}
							style={() => ` c_black tc_white ml-[.3rem] w-full`}
						/>
						{form_data().search.trim() !== "" && (
							<B
								click={() => form_data({...form_data(), search: ""})}
								style={() =>
									`ml-[.2rem] mr-[.3rem] w-[.75rem] h-[.75rem] stroke-white stroke-[1rem]`
								}>
								<CrossIcon />
							</B>
						)}
					</div>

					{!see_search() && (
						<B
							click={() => {
								see_search(true)
								search_field?.focus()
							}}
							style={() => `w-[1.25rem] h-[1.25rem] ic_white stroke-[2rem] mt-[.2rem] `}>
							<SearchIcon />
						</B>
					)}

					<B
						click={() => opt_pick(-1)}
						style={() => `hover:tc_white ${opt_pick() === -1 && `tc_white`}`}>
						Kids
					</B>
					<B style={() => `w-[1.5rem] h-[1.5rem] stroke-white fill-white `}>
						<BellIcon />
					</B>
					<B click={() => see_profile_list(!see_profile_list())} style={() => `a_row`}>
						<img
							src={`/icons/profile_blue.jpg`}
							class={`w-[1.5rem] h-[1.5rem] mr-[.6rem] rounded-[.2rem]`}
						/>
						<div class={`w-[.8rem] h-[.4rem] ic_white a_row mt-[.5rem] `}>
							<DownTriangleIcon />
						</div>
					</B>
					{see_profile_list() === true && (
						<div
							class={`z_put c_black opacity-[.8] w-[10rem] h-fit top-[2.5rem] right-0 px-[.5rem] py-[1rem] `}>
							<div class="a_col gap-y-[.5rem]">
								<div class="a_row items-center">
									<img
										src={`/icons/profile_yellow.jpg`}
										class={`w-[1.5rem] h-[1.5rem] mr-[.6rem] rounded-[.2rem]`}
									/>{" "}
									<p>Smith</p>
								</div>
								<div class="a_row items-center">
									<img
										src={`/icons/profile_green.jpg`}
										class={`w-[1.5rem] h-[1.5rem] mr-[.6rem] rounded-[.2rem]`}
									/>{" "}
									<p>John</p>
								</div>
							</div>
							<p class='py-[1rem]'>Manage Profiles</p>
							<p class='pb-[.5rem]'>Account</p>
							<p>Help Center</p>
							<p class='py-[1rem]'>Sign out of Netflix</p>
						</div>
					)}
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
