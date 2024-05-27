import {
	state,
	react,
	construct,
	destruct,
	write,
	path,
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
	var nav = path?.nav()
	var profiles = state()

	construct(async () => {
		page.title = `Netflix`
		profiles(db?.get_all(`profiles`))
	})

	var set_profile = (v) => {
		var profile = db?.set_all(`profile`, v)
		globe({...globe(), profile})
	}

	return (
		<>
			{globe()?.profile ? (
				<Home />
			) : (
				<D style={`fit_1 pt-[10rem] ay_top sy_mid tc_grey`}>
					<D style={`z_put top-0 left-0 fit_1 v4:my-[1.25rem] h-[6rem] pt-[.5rem] v4:pt-0`}>
						<B click={() => nav("/")} style={"tc_1 tw_1 ts_3 mr-[1rem] v5:mr-[2rem]"}>
							<P value={"/config/logo.png"} style={` w-[6rem] see_null v5:see_full`} />
							<P value={"/config/logo_small.png"} style={`w-[1.75rem] v5:see_null`} />
						</B>
					</D>
					<T style={`tc_white text-[2.5rem] mb-[1rem]`}>Who's watching?</T>
					<D style={`ax_mid mb-[4rem]`}>
						{profiles()?.map((v, i) => (
							<D style={`ay_top sy_mid ${i && `ml-[2rem]`}`}>
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
