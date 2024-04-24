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
import lotr_vid from "~/home/asset/lotr_1.mp4"
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

	var Tape = ({first}) => {
		return (
			<D>
				<T style={() => `tw_5 ts_4 mb-[.5rem] ${first && `z_put top-[-2rem] `}`}>New Releases</T>
				<D style={() => `a_row gap-[.2rem]`}>
					{dir(5)
						.fill()
						.map((v) => (
							<P value={() => car3} style={() => `h-[8rem] hover:scale-[2]`} />
						))}
				</D>
			</D>
		)
	}

	return (
		<D style={() => ``}>
			<V
				def={() => lotr_pic}
				value={() => lotr_vid}
				mute={() => mute()}
				rep={() => true}
				hover_in={hover_in}
				hover_out={hover_out}
				click={() => mute(!mute())}
				style={() => `w_full e_full aspect-[25/10]`}
			/>
			<D style={() => `z_fit a_col gap-[2.5rem] v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem]`}>
				<Tape first={true}/>
				<Tape />
				<Tape />
			</D>
			{/* <P
				hover_in={() => {
					event().target.play()
					vid_playing(true)
				}}
				hover_out={() => {
					event().target.pause()
					vid_playing(false)
				}}
				click={() => mute(!mute())}
				value={() => lotr_logo}
				style={() => `z_put bottom-[.25rem] w-[50%] ${vid_playing() ? `hide` : ``}`}
			/> */}
		</D>
	)
}
