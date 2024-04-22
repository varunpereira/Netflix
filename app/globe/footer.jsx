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
import {shop_icon} from "~/globe/asset/icon"

export default () => {
	var nav = route()

	return (
		<D style={() => "fit_2 v2:px-[1rem] v3:px-[5rem] py-[2rem] "}>
			<B click={() => nav("/")} style={() => "a_row ay_mid tc_aqua tw_1 ts_3 mr-[1rem]"}>
				{shop_icon({style: () => "w-[2rem] h-[1.5rem] tc_orange mt-[.15rem]"})}
				<T>iStuff</T>
			</B>
			<T style={() => "a_row ax_mid"}>© 2024 Flixtr - Varun Pereira</T>
		</D>
	)
}
