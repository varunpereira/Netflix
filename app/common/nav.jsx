import {
	state,
	react,
	construct,
	destruct,
	write,
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
import {MenuIcon, BellIcon, DownTriangleIcon} from "~/common/icon"
import {profile} from "~/config/state"
import {db} from "~/config/db"
import Search from "~/common/search"

export default () => {
	var menu_ops = [
		{name: "Home", route: "/"},
		{name: "TV Shows", route: "/tv"},
		{name: "Movies", route: "/movies"},
		{name: "Latest", route: "/latest"},
		{name: "My List", route: "/mylist"},
		{name: "Kids", route: "/kids"},
	]
	var menu_op = state(0)
	var menu_on = state(false)
	var see_profile_list = state(false)
	var profiles = state()
	var nav = path?.nav()
	var route = path?.route()

	construct(async () => {
		profiles(db?.get_all(`profiles`))
	})

	react(() => {
		var i = menu_ops?.findIndex((v) => v?.route === route?.pathname)
		menu_op(i)
	})

	var set_profile = (v) => {
		var new_profile = db?.set_all(`profile`, v)
		profile(new_profile)
	}

	var ProfileList = () => (
		<D
			v1={`v4:p_put z-[3] v4:top-[2.5rem] v4:right-[1.5rem] v5:right-[3rem] v4:c_black v4:opacity-[.8] x_full v4:w-[10rem] ay_top sy_mid v4:sy_right px-[.5rem] py-[1rem] `}>
			<D style="ay_mid">
				{profiles()
					.filter((v) => v?.id !== profile()?.id)
					.map((v, i) => (
						<D v1={`ax_right sx_mid ${i && `mt-[.2rem]`}`} click={() => set_profile(v)}>
							<P value={v?.pic_link} v1={`w-[1.5rem] h-[1.5rem] mr-[.6rem] rounded-[.2rem]`} />
							<T>{v?.id}</T>
						</D>
					))}
			</D>
			<T style="py-[1rem]">Manage Profiles</T>
			<T style="pb-[.5rem]">Account</T>
			<T>Help Center</T>
			<T style="pt-[1rem]">Sign out of Netflix</T>
		</D>
	)

	return (
		<>
			<D
				v1={
					"p_put z-[2] c_grey_2 v4:c_null x_full fit_1 v4:ax_same pt-[.5rem] v4:pt-0 v4:my-[1.25rem] "
				}>
				{/* why not w 6rem try uncom footer */}
				<B click={() => nav("/")} v1={"tc_1 tw_1 ts_3 mr-[1rem] v5:mr-[2rem] v5:w-[7rem] "}>
					<P value={"/config/logo.png"} v1={`w-[6rem] see_null v5:see_full`} />
					<P value={"/config/logo_small.png"} v1={`w-[1.75rem] v5:see_null`} />
				</B>
				<D
					v1={`${
						!menu_on() && `see_null`
					} ay_top v4:ax_same x_full tc_grey ts_1 mb-[1rem] v4:mb-0`}>
					<D v1={`ay_top v4:ax_same`}>
						{menu_ops.slice(0, -1).map((v, i) => (
							<B
								click={() => nav(v?.route)}
								v1={`${i && `mt-[1rem] v4:mt-0 v4:ml-[1rem]`} hover:tc_white ${
									menu_op() === i && `tc_white`
								}`}>
								{v?.name}
							</B>
						))}
					</D>
					<D v1={`ay_top sy_mid v4:ax_same`}>
						<Search />
						<B
							click={() => nav("/kids")}
							v1={`v4:ml-[1.2rem] mt-[1rem] v4:mt-0 hover:tc_white ${
								menu_op() === menu_ops?.length - 1 && `tc_white `
							}`}>
							Kids
						</B>
						<B v1={`v4:ml-[1.2rem] mt-[1rem] v4:mt-0`}>
							<BellIcon style="w-[1.5rem] h-[1.5rem] stroke-[.5rem] stroke-white fill-white" />
						</B>
						<B
							click={() => see_profile_list(!see_profile_list())}
							v1={`v4:ml-[1.2rem] mt-[1rem] v4:mt-0 ax_mid`}>
							<P
								value={profile()?.pic_link}
								v1={`w-[1.5rem] h-[1.5rem] mr-[.6rem] rounded-[.2rem]`}
							/>
							<D v1={`mt-[.5rem]`}>
								<DownTriangleIcon style="w-[.5rem] h-[.3rem] stroke-[.5rem] stroke-white fill-white" />
							</D>
						</B>
						{see_profile_list() === true && <ProfileList />}
					</D>
				</D>
			</D>
			<B
				click={() => menu_on(!menu_on())}
				v1={`p_put z-[2] right-[1rem] top-[.5rem] see_full v4:see_null w-[1.75rem] h-[1.75rem]`}>
				<MenuIcon v1={`stroke-white stroke-[.1rem]`} />
			</B>
		</>
	)
}
