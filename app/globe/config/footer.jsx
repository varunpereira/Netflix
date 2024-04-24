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
} from "~/globe/config/shop"
import logo from "~/globe/asset/logo.png"

export default () => {
	var nav = route()

	return (
		<D style={() => "z_put z-[2] bottom-[0rem] mx_auto a_row ax_equal  v2:px-[1rem] v3:px-[5rem] v4:px-[10rem] py-[2rem] "}>
			<B click={() => nav("/")} style={() => "tc_1 tw_1 ts_3"}>
				<P value={() => logo} style={() => `w-[4rem] `} />
			</B>
			<T style={() =>`ts_1`}>© 2024 Netflix - Varun Pereira</T>
		</D>
	)
}
