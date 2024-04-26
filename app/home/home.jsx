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
	var prod = state([])
	var pages = state()
	var chosen = state(null)

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

	// video 16:9 fine

	var Tape = ({title}) => {
		return (
			<D style={() => ``}>
				<T style={() => `tw_5 ts_4 mb-[.5rem] `}>{title}</T>
				<D style={() => `a_row gap-[.2rem] overflow-x-auto no_scroll  `}>
					{dir(10)
						.fill()
						.map((v, i) => (
							<P
								value={() => (i % 2 == 1 ? car3 : car4)}
								style={() => `h-[8rem] w-[16rem] hover:w-[32rem] hover:h-[8rem]  `}
							/>
						))}
				</D>
			</D>
		)
	}

	return (
		<D style={() => ``}>
			<D style={() => `z_fit `}>
				<D
					style={() =>
						"z_put w-[30rem] h_full inset-0 a_col justify-center items-start p v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 text-shadow-md "
					}>
					<P value={()=>lotr_logo} style={() => `w_fit`}/>
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
					style={() => `w_full e_full aspect-[20/10] z-[1]`}
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
					`z_fit z-[2] mt-[-6rem] a_col gap-[2rem] v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem]`
				}>
				<Tape first={true} title="New Releases" />
				<Tape title="Trending Now" />
				<Tape title="Popular on Netflix" />
			</D>
		</D>
	)
}
