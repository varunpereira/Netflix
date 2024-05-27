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
	D,
	T,
	B,
	V,
	P,
	num,
} from "~/config/shop"
import {ChevronRightIcon} from "~/pieces/icon"
import {VolumeIcon, MuteIcon} from "~/pieces/icon"
import {db} from "~/config/db"

export default () => {
	var nav = route()
	var mute = state(true)
	var video_ref
	var playing = state(false)
	var shows = state()
	var sel_tape = state()
	var sel_slide = state(false)
	var show_vid = state(false)
	var tv = state()

	construct(async () => {
		page.title = `Latest - Netflix`
		shows(db?.get(`shows`))
		tv(db?.get(`tv`))
	})

	var handleTimeUpdate = () => {
		if (video_ref.currentTime >= 61) {
			video_ref.currentTime = 0
		}
	}

	react(() => {
		if (playing()) {
			video_ref?.play()
		} else video_ref?.pause()
	})

	react(() => {
		if (num.is_int(sel_slide())) {
			var timer = setTimeout(() => show_vid(true), 2000)
			destruct(() => clearTimeout(timer))
		} else {
			show_vid(false)
		}
	})

	var Tape = ({data = () => [], title, i}) => {
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
										playsinline
										autoplay
										muted
										loop
										class="c_full z-[4] w-[30rem] h-[14rem] z_fit z-[3]"
									/>
									{/* <iframe class="c_norm z-[4] w-[28rem] h-[14rem]" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media"></iframe> */}
									<T style={`ml-[.5rem] mt-[-3rem] z-[5] a_null z_fit z-[4]`}>{v2?.title}</T>
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

	return (
		<D hover_in={() => playing(true)} style={`z_fit z-[1]`}>
			<D
				style={
					"z_put z-[1] left-0 top-[12rem] w-[15rem] v3:w-[30rem] h_full v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 "
				}>
				<P value={`/shows/The Internship/logo.png`} />
				<T style={`my-[1rem]`}>
					Two salesmen find themselves unemployed when the company they work at gets shut down. In a
					bid to prove their competence, they land internships at Google and try to beat some
					tech-savvy geniuses.
				</T>
				<D style={`ax_right`}>
					<B
						click={() => nav("/watch/181")}
						style={`c_black opacity-[.7] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] text-shadow-xl`}>
						<T>Play</T>
					</B>
					<B
						style={`ml-[.75rem] c_black opacity-[.7] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] `}>
						My List
					</B>
				</D>
			</D>
			<B
				style={`z_put z-[1] right-[2.5rem] top-[30rem] ic_white opacity w-[1.75rem] h-[1.75rem] c_black rounded-full opacity-[.7] `}
				click={() => mute(!mute())}>
				{mute() ? <MuteIcon /> : <VolumeIcon />}
			</B>
			<D
				style={"z_put top-[0rem] bg-gradient-to-b from-[#141414] to-transparent w_full h-[4rem]"}
			/>
			<video
				ref={video_ref}
				onTimeUpdate={handleTimeUpdate}
				src="/shows/The Internship/snip.mp4"
				playsinline
				autoplay
				muted={mute()}
				loop
				class="w-full h-[50rem] c_norm"
			/>
			<D
				style={
					"z_put z-[0] top-[38rem] bg-gradient-to-b from-transparent to-[#141414] w_full h-[12rem]"
				}
			/>
			<D
				style={`z_put z-[1] top-[70rem] w-full h-full ay_mid v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] `}>
				{tv()?.tapes?.map((v, i) => (
					<Tape
						data={() => shows()?.slice((i + 1) * 18 - 18, (i + 1) * 18)}
						title={v?.title}
						i={i}
					/>
				))}
			</D>
		</D>
	)
}
