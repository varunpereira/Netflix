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
} from "~/config/shop"
import {ChevronRightIcon} from "~/pieces/icon"
import {all_shows_data} from "~/data/shows/all"
import {VolumeIcon, MuteIcon} from "~/pieces/icon"

export default () => {
	var nav = route()
	var mute = state(true)
	var sel_tape = state()
	var playing = state(false)
	var video_ref
	var sel_slide = state(false)
	var show_vid = state(false)

	react(() => {
		if (playing()) video_ref?.pause()
		else video_ref?.play()
	})

	construct(async () => {
		page.title = `Home - Netflix`
		video_ref?.play()
	})

	react(() => {
		if (sel_slide()) {
			var timer = setTimeout(() => show_vid(true), 2000)
			destruct(() => clearTimeout(timer))
		} else {
			show_vid(false)
		}
	})

	var Tape = ({data = [], title, i}) => {
		return (
			<D style={`z_fit z-[${i === sel_tape() ? "2" : "1"}] mt-[-5rem] `}>
				<T style={`tw_5 ts_4 mb-[-3rem]`}>{title}</T>
				<D
					style={`w-full ${
						sel_tape() == null ? "h-[7rem] my-[3.5rem]" : "h-[14rem]"
					} ax_right sx_mid gap-x-[.3rem] no_scroll overflow-y-hidden ${
						sel_tape() == null || sel_tape() === i ? "overflow-x-auto" : "overflow-x-hidden"
					} `}>
					{data.map((v, i2) => (
						<D
							hover_in={() => {
								sel_tape(i)
								sel_slide(i2)
							}}
							hover_out={() => {
								sel_tape(false)
								sel_slide(false)
							}}
							click={() => nav(`/watch/${v?.id}`)}
							css={`
								background-image: url(${v?.poster_link});
								background-size: 100% 100%;
								background-repeat: no-repeat;
							`}
							style={`a_norm aspect-[16/9] 
						w-[14rem] h-[7rem]
						a_norm cursor_pointer
						trans_end
						hover:trans_start
						hover:w-[28rem] hover:h-[14rem] overflow-hidden`}>
							{sel_slide() === i2 && sel_tape() === i && show_vid() === true ? (
								<>
									<video
										src={v?.id === 134 ? `/shows/lotr/snip.mp4` : "/shows/intro.mp4#t=2,25"}
										playsinline
										autoplay
										muted
										loop
										class="c_full mt-[-.9rem] z-[4]"
									/>
									<T style={`ml-[.5rem] mt-[-4rem] z-[5] a_null`}>{v?.title}</T>
								</>
							) : (
								<P value={v?.poster_link} style={`w-full h-full`}/>
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
		<D hover_in={() => playing(false)} hover_out={() => playing(true)} style={`z_fit z-[1]`}>
			<D
				style={
					"z_put z-[1] left-0 top-[12rem] w-[15rem] v3:w-[30rem] h_full v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 "
				}>
				<P value={`/shows/lotr/logo.png`} style={`w_fit`} />
				<T style={`my-[1rem]`}>
					Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from
					Frodo and Sam as they approach Mount Doom with the One Ring.
				</T>
				<D style={`ax_right gap-x-[.75rem]`}>
					<B
						click={() => nav("/watch/134")}
						style={`z_fit c_black opacity-[.7] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] text-shadow-xl`}>
						<T>Play</T>
					</B>
					<B style={`c_black opacity-[.7] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] `}>
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
				src="/shows/lotr/snip.mp4"
				playsinline
				autoplay
				muted={mute()}
				loop
				class="w-full h-[50rem] c_norm"
			/>
			{/* <V
				ref={video_ref}
				value={`/shows/lotr/snip.mp4`}
				mute={mute()}
				rep={true}
				style={`w-full h-[50rem] c_norm `}
			/> */}
			<D
				style={
					"z_put z-[0] top-[38rem] bg-gradient-to-b from-transparent to-[#141414] w_full h-[12rem]"
				}
			/>
			<D
				style={`z_put z-[1] top-[70rem] w-full h-full ay_mid gap-y-[4rem] v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] `}>
				<Tape data={all_shows_data().slice(0, 18).reverse()} title={`Trending Now`} i={1} />
				<Tape
					data={all_shows_data().slice(18, 36).reverse()}
					title={`Because You Watched Peppa Pig`}
					i={2}
				/>
				<Tape data={all_shows_data().slice(36, 54)} title={`Popular on Netflix`} i={3} />
				<Tape data={all_shows_data().slice(54, 72)} title={`Comedy`} i={4} />
				<Tape data={all_shows_data().slice(72, 90)} title={`Thriller`} i={5} />
				<Tape data={all_shows_data().slice(90, 108)} title={`Action`} i={6} />
				<Tape data={all_shows_data().slice(108, 126)} title={`Drama`} i={7} />
				<Tape data={all_shows_data().slice(126, 144)} title={`Adventure`} i={8} />
				<Tape data={all_shows_data().slice(144, 162).reverse()} title={`Romance`} i={9} />
				<Tape data={all_shows_data().slice(162, 180).reverse()} title={`Kids`} i={10} />
			</D>
		</D>
	)
}
