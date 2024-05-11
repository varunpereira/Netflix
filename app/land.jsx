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
	dir,
	D,
	T,
	B,
	V,
	P,
} from "~/config/shop"
import {show_nav} from "~/config/state"
import Home from "~/home"

export default () => {
	var nav = route()
	show_nav(false)
	var show_home = state(false)

	construct(async () => {
		page.title = `Netflix`
	})

	var profiles = [
		{name: `Steve`, pic_link: `/icons/profile_green.jpg`},
		{name: `Bill`, pic_link: `/icons/profile_blue.jpg`},
		{name: `John`, pic_link: `/icons/profile_yellow.jpg`},
	]

	return (
		<>
			{show_home() || true ? (
				<Home />
			) : (
				<D style={`fit_1 pt-[10rem] dy_top ax_mid tc_grey`}>
					<P value={`/config/logo.png`} style={`z_put top-[1rem] left-[2rem] w-[5rem]`} />
					<T style={`tc_white text-[2.5rem] mb-[1rem]`}>Who's watching?</T>
					<D style={`dx_mid gap-x-[2rem] mb-[4rem]`}>
						{profiles.map((v, i) => (
							<D style={`dy_top ax_mid`}>
								<>
									<P value={v?.pic_link} click={() => show_home(true)} style={`w-[8rem] h-[8rem] cursor_pointer`} />
									<T style={`mt-[.75rem]`}>{v?.name}</T>
								</>
							</D>
						))}
					</D>
					<B style={` border-[.1rem] border-gray-300 px-[1.5rem] py-[.75rem]`}>MANAGE PROFILES</B>
				</D>
			)}
		</>
	)
}
