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
} from "~/globe/config/shop"
import car1 from "~/home/asset/1.jpg"
import car2 from "~/home/asset/2.jpg"
import car3 from "~/home/asset/3.jpg"
import car4 from "~/home/asset/4.jpg"
import lotr_1 from "~/home/asset/lotr_1.mp4"
import test_1 from "~/home/asset/test_1.mp4"
import lotr_pic from "~/home/asset/lotr_1.png"
import lotr_logo from "~/home/asset/lotr_1_logo.png"
import {ChevronRightIcon} from "../globe/asset/icon"
// import prod_short from "~/prod/short"

export default () => {
	var car = state([car1, car2, car3, car4])
	var car_index = state(0)
	var car_interv = timer.put(() => {
		car_index((i) => {
			if (i == car().length) i = 0
			return (i + 1) % car().length
		})
	}, 3000)
	var nav = route()
	var mute = state(true)
	var vid_playing = state(false)
	var event = state()
	var chosenSlider = state(null)
	var tape_data = state([`New Releases`, `Trending Now`, `Popular on Netflix`])
	var chosenSlide = state(null)

	construct(async () => {
		page.title = `Home - Netflix`
		// auth func
		// var res = await req("/search/trend")
		// prod(res.prod)
	})

	destruct(() => {
		timer.cut(car_interv)
	})

	var hover_in = (e) => {
		e.target.play()
		event(e)
		vid_playing(true)
	}

	var hover_out = (e) => {
		e.target.pause()
		event(e)
		vid_playing(false)
	}

	// video 16:9 fine, use unicode

	var Tape = ({title, i}) => {
		return (
			<div>
				<p class={`tw_5 ts_4 mb-[-60px]`}>{title}</p>
				<div
					onMouseOver={() => chosenSlider(i)}
					onMouseLeave={() => chosenSlider(null)}
					class={`h-[260px] w-full a_row items-center justify-start gap-[10px] overflow-auto no_scroll`}>
					{dir(10)
						.fill()
						.map(() => (
							<img src={car1} class={`w-[300px] h-[130px] hover:h-[260px] hover:w-[400px] `} />
						))}
					{/* if wanting, div > rel > abs */}
					<button
						class={
							"z_put z-[5] c_black opacity-[.6] right-0 w-[4.2rem] h-[130px] a_row justify-center items-center"
						}>
						{chosenSlider() === i && <div class={`text-3xl`}>&#10095;</div>}
					</button>
				</div>
			</div>
		)
	}

	return (
		<D style={() => ``}>
			<D style={() => `z_fit z-[1] `}>
				<D
					style={() =>
						"z_put z-[1] w-[30rem] h_full inset-0 a_col justify-center items-start p v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 text-shadow-md "
					}>
					<P value={() => lotr_logo} style={() => `w_fit`} />
					<T style={() => `my-[1rem]`}>Six people go out into the woods. Only 4 return...</T>
					<D style={() => `a_row gap-[.75rem]`}>
						<B
							style={() =>
								`c_black opacity-[.4] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] text-shadow-xl`
							}>
							Play
						</B>
						<B
							style={() =>
								`c_black opacity-[.4] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] `
							}>
							My List
						</B>
					</D>
				</D>
				<V
					value={() => test_1}
					mute={() => mute()}
					rep={() => true}
					hover_in={hover_in}
					hover_out={hover_out}
					click={() => mute(!mute())}
					style={() => `w_full e_full aspect-[20/10] `}
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
					`z_fit z-[2] w-full h-full mt-[-6rem] a_col gap-[2rem] v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem]`
				}>
				{tape_data().map((v, i) => (
					<Tape title={v} i={i} />
				))}
			</D>
		</D>
	)
}
