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
	D,
	T,
	B,
	P,
	I,
	V,
	num,
} from "~/config/shop"
import {db} from "~/config/db"
import {ChevronRightIcon} from "~/common/icon"

export default (props) => {
	var nav = path?.nav()
	var data = state([])
	var sel_tape = state()
	var sel_slide = state(false)
	var show_vid = state(false)
	var {title, show_ids, i} = props

	construct(() => {
		data(db?.get_all(`shows`).filter((v) => show_ids.includes(v?.id)))
	})

	react(() => {
		if (num.is_int(sel_slide())) {
			var timer = setTimeout(() => show_vid(true), 2000)
			destruct(() => clearTimeout(timer))
		} else {
			show_vid(false)
		}
	})

	return (
		<D style={`z_fit z-[${i === sel_tape() ? "2" : "1"}] ${i && `mt-[-1rem]`}`}>
			<T style={`tw_5 ts_4 mb-[-3rem]`}>{title}</T>
			<D
				style={`w-full ${
					sel_tape() == null ? "h-[7rem] my-[3.5rem]" : "h-[14rem]"
				} ax_right sx_mid no_scroll overflow-y-hidden ${
					sel_tape() == null || sel_tape() === i ? "overflow-x-auto" : "overflow-x-hidden"
				} `}>
				{data()?.map((v2, i2) => (
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
									class="c_full z-[4] w-[30rem] h-[14rem] z_fit z-[3]"
								/>
								{/* <iframe class="c_norm z-[4] w-[28rem] h-[14rem]" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media"></iframe> */}
								<T style={`ml-[.5rem] mt-[-3rem] a_null z_fit z-[4]`}>{v2?.title}</T>
							</>
						) : (
							<P value={v2?.cover_link} style={`w-full h-full`} />
						)}
					</D>
				))}
				<B style={"z_put c_black opacity-[.6] right-0 w-[4.2rem] h-[7rem] ax_mid sx_mid"}>
					{sel_tape() === i && (
						<D style={`w-[1.5rem] h-[1.5rem] stroke-white stroke-[.5rem]`}>
							<ChevronRightIcon />
						</D>
					)}
				</B>
			</D>
		</D>
	)
}
