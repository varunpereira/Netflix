import {path, D, T, B, V, P} from "~/config/shop"

export default () => {
	var nav = path?.nav()

	return (
		<D style={"z_put z-[6] top-0 ax_same v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem] "}>
			<B click={() => nav("/")} style={"tc_1 tw_1 ts_3 mr-[1rem] v5:mr-[2rem]"}>
				<P value={"/config/logo.png"} style={`w-[6rem] see_null v5:see_full`} />
				<P value={"/config/logo_small.png"} style={`w-[1.75rem] v5:see_null`} />
			</B>
			<T style={`ts_1`}>© 2024 Netflix - Varun Pereira</T>
		</D>
	)
}
