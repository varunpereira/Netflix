import {
	state,
	react,
	construct,
	destruct,
	write,
	path,
	page,
	req,
	dir,
	num,
	D,
	T,
	B,
	V,
	P,
} from "~/config/shop"
import {db} from "~/config/db"
import {chunk_dir} from "~/common/funcs"

export default () => {
	var nav = path?.nav()
	var data = state()
	var sel_tape = state()
	var sel_slide = state(false)
	var show_vid = state(false)

	construct(async () => {
		page.title = `My List - Netflix`
		var all_shows = db?.get_all(`shows`)
		var my_list = db?.get_all(`my_list`)
		var my_list = all_shows?.filter((v) => my_list?.show_ids?.includes(v?.id))
		data(chunk_dir(my_list))
	})

	react(() => {
		if (num.is_int(sel_tape())) {
			var timer = setTimeout(() => {
				show_vid(true)
			}, 2000)
			destruct(() => clearTimeout(timer))
		} else {
			show_vid(false)
		}
	})

	return (
		<>
			<D style={`fit_1 mt-[5rem] ay_mid x_full y_full overflow-x-hidden`}>
				<T style={`mb-[1rem] ml-[4rem]`}>My List</T>
				{data()?.map((v, i) => (
					<D
						style={`z_fit z-[${
							i === sel_tape() ? "1" : "0"
						}] x_full h-[14rem] ax_mid sx_mid mt-[-3rem] `}>
						{/* rep piece */}
						{v.map((v2, i2) => (
							<D
								hover_in={() => {
									sel_tape(i)
									sel_slide(i2)
								}}
								hover_out={() => {
									sel_tape(false)
									sel_slide(false)
								}}
								click={() => nav(`/watch/${v2?.id}`)}
								style={`a_norm w-[14rem] h-[7rem] ${i2 && `ml-[.3rem]`} cursor_pointer trans_end
								hover:trans_start hover:w-[28rem] hover:h-[14rem] overflow-hidden`}>
								{sel_slide() === i2 && sel_tape() === i && show_vid() === true ? (
									<>
										<video
											src={v2?.snip_link?.trim() !== "" ? v2?.snip_link : "/shows/def.mp4"}
											playsInline
											autoPlay
											muted
											loop
											preload="none"
											class="c_full z-[4] w-[30rem] h-[14rem] z_fit z-[3]"
										/>
										<T style={`ml-[.5rem] mt-[-3rem] z-[5] a_null z_fit z-[4]`}>{v2?.title}</T>
									</>
								) : (
									<P value={v2?.cover_link} style={`x_full y_full`} />
								)}
							</D>
						))}
					</D>
				))}
			</D>
		</>
	)
}
