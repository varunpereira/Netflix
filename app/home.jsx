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
import {show_nav} from "~/config/state"

export default () => {
	show_nav(true)
	var nav = route()
	var mute = state(true)
	var chosenSlider = state(undefined)
	var chosenSlide = state(null)
	var isPlaying = state(false)
	var video_ref

	react(() => {
		if (isPlaying()) video_ref?.pause()
		else video_ref?.play()
	})

	construct(async () => {
		page.title = `Home - Netflix`
	})

	// video 16:9 fine,

	var Tape = ({data = [], title, i}) => {
		return (
			<D style={`z_fit z-[${i === chosenSlider() ? "2" : "1"}] mt-[-5rem] `}>
				<T style={`tw_5 ts_4 mb-[-3rem]`}>{title}</T>
				<D
					style={`w-full ${chosenSlider() === undefined ? 'h-[7rem] my-[3.5rem]':'h-[14rem]'} dx_right ay_mid gap-x-[.3rem] no_scroll ${chosenSlider() !== null ? "overflow-x-auto " : "overflow-x-hidden"} `}>
					{data.map((v, i2) => (
						<P
							click={() => nav(`/watch/${v?.id}`)}
							hover_in={() => chosenSlider(i)}
							hover_out={() => chosenSlider(null)}
							value={v?.poster_link}
							css={"transition:width 1s .5s, height 1s .5s;"}
							style={`w-[14rem] h-[7rem] aspect-[16/9] hover:w-[28rem] hover:h-full d_null cursor_pointer`}
						/>
					))}
					<B style={"z_put c_black opacity-[.6] right-0 w-[4.2rem] h-[7rem] dx_mid ay_mid"}>
						{chosenSlider() === i && (
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
		<D style={``}>
			<D
				hover_in={() => isPlaying(false)}
				hover_out={() => isPlaying(true)}
				click={() => mute(!mute())}
				style={`z_fit z-[1] dx_mid`}>
				<D
					style={
						"z_put z-[1] left-0 top-[12rem] w-[30rem] h_full v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 "
					}>
					<P value={`/shows/snippets/lotr_1_logo.png`} style={`w_fit`} />
					<T style={`my-[1rem]`}>
						Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from
						Frodo and Sam as they approach Mount Doom with the One Ring.
					</T>
					<D style={`dx_right gap-x-[.75rem]`}>
						<B
							click={() => nav("/watch/0")}
							style={`z_fit c_black opacity-[.4] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] text-shadow-xl`}>
							<T>Play</T>
						</B>
						<B style={`c_black opacity-[.4] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] `}>
							My List
						</B>
					</D>
				</D>
				<V
					ref={video_ref}
					value={`/shows/snippets/lotr_1
					
					.mp4#t=80,298`}
					def="/shows/snippets/lotr_1.png"
					mute={mute()}
					rep={true}
					style={`w_full overflow-x-hidden e_full aspect-[2.4/1] hover:scale-200 `}
				/>
				<D
					style={
						"z_put z-[2] bottom-[0rem] bg-gradient-to-b from-transparent to-[#141414] w_full h-[6rem]"
					}
				/>
				<D
					style={"z_put top-[0rem] bg-gradient-to-b from-[#141414] to-transparent w_full h-[4rem]"}
				/>
			</D>

			<D
				style={`w-full h-full mt-[2rem] dy_mid gap-y-[4rem] v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] `}>
				<Tape data={all_shows_data().slice(0, 18)} title={`Trending Now`} i={1} />
				<Tape data={all_shows_data().slice(18, 36)} title={`New Releases`} i={2} />
				<Tape data={all_shows_data().slice(36, 54)} title={`Popular on Netflix`} i={3} />
				<Tape data={all_shows_data().slice(54, 72)} title={`Comedy`} i={4} />
				<Tape data={all_shows_data().slice(72, 90)} title={`Thriller`} i={5} />
				<Tape data={all_shows_data().slice(90, 108)} title={`Action`} i={6} />
				<Tape data={all_shows_data().slice(108, 126)} title={`Drama`} i={7} />
				<Tape data={all_shows_data().slice(126, 144)} title={`Adventure`} i={8} />
				<Tape data={all_shows_data().slice(144, 162)} title={`Romance`} i={9} />
				<Tape data={all_shows_data().slice(162, 180)} title={`Kids`} i={10} />
			</D>
		</D>
	)
}
