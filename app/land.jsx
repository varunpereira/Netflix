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
	globe,
	D,
	T,
	B,
	V,
	P,
} from "~/config/shop"
import Home from "~/home"
import {db} from '~/config/db'

export default () => {
	var nav = route()
	var profiles = state()

	construct(async () => {
		page.title = `Netflix`
		profiles(db.get(`profiles`))
	})

	var set_profile = (v) => {
		var data = db.set(`profile`, v)
		globe({...globe(), profile: data})
	}

	return (
		<>
			{globe()?.profile ? (
				<Home />
			) : (
				<D style={`fit_1 pt-[10rem] dy_top ax_mid tc_grey`}>
					<D style={`z_put inset-0 fit_1 v4:my-[1.25rem] h-[6rem] pt-[.5rem] v4:pt-0`}>
						<B click={() => nav("/")} style={"tc_1 tw_1 ts_3 mr-[1rem] v5:mr-[2rem]"}>
							<P value={"/config/logo.png"} style={` w-[6rem] hide v5:see`} />
							<P value={"/config/logo_small.png"} style={`w-[1.75rem] v5:hide`} />
						</B>
					</D>
					<T style={`tc_white text-[2.5rem] mb-[1rem]`}>Who's watching?</T>
					<D style={`dx_mid gap-x-[2rem] mb-[4rem]`}>
						{profiles().map((v, i) => (
							<D style={`dy_top ax_mid`}>
								<>
									<P
										value={v?.pic_link}
										click={() => set_profile(v)}
										style={`w-[8rem] h-[8rem] cursor_pointer`}
									/>
									<T style={`mt-[.75rem]`}>{v?.id}</T>
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
