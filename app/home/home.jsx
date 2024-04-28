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

export default () => {
	// var car_index = state(0)
	// var car_interv = timer.put(() => {
	// 	car_index((i) => {
	// 		if (i == car().length) i = 0
	// 		return (i + 1) % car().length
	// 	})
	// }, 3000)
	var nav = route()
	var mute = state(true)
	var chosenSlider = state(null)
	var tape_data = state([`Trending Now`, `New Releases`, `Popular on Netflix`])
	var chosenSlide = state(null)
	var isPlaying = state(false)
	var video_ref

	react(()=>{
		if (isPlaying()) video_ref.pause()
		else video_ref.play()
	})

	construct(async () => {
		page.title = `Home - Netflix`
		// auth func
		// var res = await req("/search/trend")
		// prod(res.prod)
	})

	destruct(() => {
		// timer.cut(car_interv)
	})

	// video 16:9 fine,

	var Tape = ({title, i}) => {
		return (
			<div class={`z_fit z-[3]`}>
				<p class={`tw_5 ts_4 mb-[-58px]`}>{title}</p>
				<div
					onMouseOver={() => chosenSlider(i)}
					onMouseLeave={() => "chosenSlider(null)"}
					class={`h-[260px] w-full a_row items-center justify-start gap-[.3rem] overflow-auto no_scroll`}>
					{dir(22)
						.fill()
						.map((v, i2) => (
							<img
								src={`/home/trending/${i2 + 1}.jpg`}
								class={`w-[300px] h-[130px] hover:h-[260px] hover:w-[400px] `}
							/>
						))}
					{/* if wanting, div > rel > abs */}
					<button
						type="button"
						class={
							"z_put z-[4] c_black opacity-[.6] right-0 w-[4.2rem] h-[130px] a_row justify-center items-center"
						}>
						{chosenSlider() === i && (
							<div class={`w-[1.5rem] h-[1.5rem] stroke-white stroke-[.5rem]`}>
								<ChevronRightIcon />
							</div>
						)}
					</button>
				</div>
			</div>
		)
	}

	return (
		<D style={() => ``}>
			<D
				hover_in={()=>isPlaying(false)}
				hover_out={()=>isPlaying(true)}
				click={() => mute(!mute())}
				style={() => `z_fit z-[1] `}>
				<D
					style={() =>
						"z_put z-[1] w-[30rem] h_full inset-0 a_col justify-center items-start p v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 text-shadow-md "
					}>
					<img src={`/home/lotr_1_logo.png`} class={`w_fit`} />
					<T style={() => `my-[1rem]`}>Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.</T>
					<D style={() => `a_row gap-[.75rem]`}>
						<B
							style={() =>
								`z_fit c_black opacity-[.4] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] text-shadow-xl`
							}>
							<T>Play</T>
						</B>
						<B
							style={() =>
								`c_black opacity-[.4] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] `
							}>
							My List
						</B>
					</D>
				</D>
				<video
					ref={video_ref}
					src={`/home/lotr_1.mp4`}
					poster="/home/lotr_1.png"
					muted={mute()}
					loop={true}
					class={`w_full e_full aspect-[16/9] hover:scale-200`}
				/>
				<D
					style={() =>
						"z_put z-[2] bottom-[0rem] bg-gradient-to-b from-transparent to-[#141414] w_full h-[4rem]"
					}
				/>
				<D
					style={() =>
						"z_put top-[0rem] bg-gradient-to-b from-[#141414] to-transparent w_full h-[4rem]"
					}
				/>
			</D>
			<D
				style={() =>
					`w-full h-full mt-[-12rem] a_col v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem]`
				}>
				{tape_data().map((v, i) => (
					<Tape title={v} i={i} />
				))}
			</D>
		</D>
	)
}
