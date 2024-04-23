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
		<D style={() => "a_row ax_equal v2:px-[1rem] v3:px-[5rem] py-[2rem] "}>
			<B click={() => nav("/")} style={() => "tc_1 tw_1 ts_3"}>
				<P value={() => logo} style={() => `w-[6rem] `} />
			</B>
			<T>© 2024 Netflix - Varun Pereira</T>
		</D>
	)
}
