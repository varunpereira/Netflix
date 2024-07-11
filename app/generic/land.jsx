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
	D,
	T,
	B,
	V,
	P,
} from "~/config/shop"
import Home from "~/generic/home"
import {db} from '~/config/db'
import {profile} from '~/config/state'

export default () => {
	var nav = path?.nav()
	var profiles = state()

	construct(async () => {
		page.title = `Netflix`
		profiles(db?.get_all(`profiles`))
	})

	var set_profile = (v) => {
		var new_profile = db?.set_all(`profile`, v)
		profile(new_profile)
	}

	return (
		<>
			{profile() ? (
				<Home />
			) : (
				<D v1={`fit_1 pt-[10rem] ay_top sy_mid tc_grey`}>
					<D v1={`p_put top-0 pl=0 fit_1 v4:my-[1.25rem] h-[6rem] pt-[.5rem] v4:pt-0`}>
						<B click={() => nav("/")} v1={"tc_1 tw_1 ts_3 mr-[1rem] v5:mr-[2rem]"}>
							<P value={"/config/logo.png"} v1={` w-[6rem] see_null v5:see_full`} />
							<P value={"/config/logo_small.png"} v1={`w-[1.75rem] v5:see_null`} />
						</B>
					</D>
					<T v1={`tc_white text-[2.5rem] mb-[1rem]`}>Who's watching?</T>
					<D v1={`ax_mid mb-[4rem]`}>
						{profiles()?.map((v, i) => (
							<D v1={`ay_top sy_mid ${i && `ml-[2rem]`}`}>
								<>
									<P
										value={v?.pic_link}
										click={() => set_profile(v)}
										v1={`w-[8rem] h-[8rem] cursor_pointer`}
									/>
									<T v1={`mt-[.75rem]`}>{v?.id}</T>
								</>
							</D>
						))}
					</D>
					<B click={() => set_profile(profiles()[0])} v1={` bw_2 bc_grey_1 px-[1.5rem] py-[.75rem]`}>MANAGE PROFILES</B>
				</D>
			)}
		</>
	)
}
