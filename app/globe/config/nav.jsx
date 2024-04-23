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
import {shop_icon, menu_icon, cart_icon, sign_in_icon} from "~/globe/asset/icon"
import Searcher from "~/search/searcher"

export default () => {
	var width = state()
	var nav = route()
	var acc_click = state(false)
	var menu_click = state(false)

	construct(async () => {
		// write(globe())
		width(view.width())
		view.put_listen("resize", handler)
	})

	destruct(() => {
		view.cut_listen("resize", handler)
	})

	react(() => {})

	var handler = () => {
		width(view.width())
	}

	var sign_out = async () => {
		var res = await req("/login/auth_cut")
		if (res?.flaw != null) {
			return
		}
		nav_full("/signin")
	}

	return (
		<D style={() => "c_null z_put z-[2] a_row ax_equal my-[.5rem] w_full"}>
			<B click={() => nav("/")} style={() => "a_row ay_mid tc_1 tw_1 ts_3 mr-[1rem]"}>
				NETFLIX
			</B>
			<Searcher />
			<B click={() => menu_click(!menu_click())}>
				{menu_icon({style: () => "v2:see v3:hide w-[1.75rem] h-[1.75rem] hover:ibc_grey"})}
			</B>
			<D
				style={() =>
					`z_fit v2:z_put v2:z-[4] v2:c_null v2:a_row v2:ax_left v2:px-[1rem] v2:left-[0rem] v2:top-[2.5rem] v2:w_full v3:z_normal v3:px-[0rem] v3:w_fit`
				}>
				{width() >= 640 || menu_click() === true ? (
					globe()?.email != null ? (
						<D
							style={() =>
								"v2:w_full v2:a_col v3:z_fit v3:a_row v3:ax_right v3:w_fit v3:pt-[.2rem] v3:r_null" +
								(!acc_click() ? "v2:rb_1" : "")
							}>
							<B
								click={() => nav("/cart")}
								style={() => "a_row mr-[1rem] hover:tc_grey hover:ibc_grey"}>
								{cart_icon({style: () => "w-[1.6rem] h-[1.6rem]"})}
								<T style={() => `ts_1 -mt-[.4rem]`}>{globe()?.cart_size}</T>
							</B>
							<B click={() => acc_click(!acc_click())} style={() => `a_row`}>
								{globe().email}
							</B>
							{acc_click() === true ? (
								<D>
									<B
										click={() => nav("/chat") + acc_click(false)}
										style={() =>
											"a_row c_black v3:z_put v3:z-[4] v3:right-[0rem] v3:left_auto v3:px-[1rem] v3:w-[10rem] v3:top-[2.5rem]"
										}>
										Chat
									</B>
									,
									<B
										click={sign_out}
										style={() =>
											"a_row c_black v3:z_put v3:z-[4] v3:right-[0rem] v3:left_auto v3:px-[1rem] v3:w-[10rem] v3:top-[4rem] rb_1"
										}>
										Sign out
									</B>
								</D>
							) : (
								""
							)}
						</D>
					) : (
						""
						// <D style={() => "z-[6] v2:w_full v2:a_col v3:a_row tc_white ic_white"}>
						// 	<B
						// 		click={() => nav("/cart")}
						// 		style={() => "a_row mr-[1rem] hover:tc_grey hover:ibc_grey"}>
						// 		{cart_icon({style: () => "w-[1.6rem] h-[1.6rem]"})}
						// 		<T style={() => "ts_1 -mt-[.4rem]"}>{globe()?.cart_size}</T>
						// 	</B>
						// 		jn
						// 	<B click={() => nav("/signin")} style={() => "v2:a_row v3:a_null"}>
						// 		{sign_in_icon({style: () => "w-[1.6rem] h-[1.6rem] ibc_white hover:ibc_grey"})}
						// 	</B>
						// </D>
					)
				) : (
					""
				)}
			</D>
		</D>
	)
}
