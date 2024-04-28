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
} from "~/config/shop"

export default () => {
	var nav = route()

	return (
		<D style={() => "mx_auto a_row ax_equal v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem] "}>
			<B click={() => nav("/")} style={() => "tc_1 tw_1 ts_3"}>
				<img src={'/logo.png'} class={`w-[6rem]`} />
			</B>
			<T style={() =>`ts_1`}>© 2024 Netflix - Varun Pereira</T>
		</D>
	)
}
