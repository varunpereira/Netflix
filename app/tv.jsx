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
import Tape from "~/pieces/tape"

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
		page.title = `TV Shows - Netflix`
		shows(db?.get(`shows`))
		tv(db?.get(`tv`))
	})

	var handleTimeUpdate = () => {
		// if (video_ref.currentTime >= 104) {
		// 	video_ref.currentTime = 0
		// }
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

	return (
		<D style={`z_fit z-[1]`}>
			<D
				style={
					"z_put z-[1] left-0 top-[12rem] w-[15rem] v3:w-[30rem] h_full v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 "
				}>
				<P value={`/shows/Stranger Things/logo.png`} />
				<T style={`my-[1rem]`}>
					When a young boy vanishes, a small town uncovers a mystery involving secret experiments,
					terrifying supernatural forces and one strange little girl.
				</T>
				<D style={`ax_right`}>
					<B
						click={() => nav("/watch/127")}
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
				src="/shows/Stranger Things/snip.mp4"
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
						data={() =>
							shows()
								?.slice((i + 1) * 18 - 18, (i + 1) * 18)
								.reverse()
						}
						title={v?.title}
						i={i}
					/>
				))}
			</D>
		</D>
	)
}
