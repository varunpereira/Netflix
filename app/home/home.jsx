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
	var pause = state(false)
	var event = state()
	var prod = state([])
	var pages = state()

	construct(async () => {
		page.title = `Home - Netflix`
		// auth func
		// var res = await req("/search/trend")
		// prod(res.prod)
	})

	destruct(() => {
		timer.cut(car_interv)
	})

	window.addEventListener("load", function () {
		var newVideo = document.getElementById("vid")
		newVideo.addEventListener(
			"ended",
			function () {
				this.currentTime = 0
				this.play()
			},
			false,
		)

		newVideo.play()
	})

	var hover_in = (e) => {
		e.target.play()
		event(e)
		pause(true)
	}

	var hover_out = (e) => {
		e.target.pause()
		event(e)
		pause(false)
	}

	return (
		<D style={() => `fit_1 z_fit z-[1]`}>
			<V
				id="vid"
				def={() => lotr_pic}
				value={() => lotr_vid}
				mute={() => mute()}
				rep={()=>true}
				hover_in={hover_in}
				hover_out={hover_out}
				click={() => mute(!mute())}
				style={() => `w_full e_full aspect-[25/10]`}
			/>
			<P
				hover_in={() => {
					event().target.play()
					pause(true)
				}}
				hover_out={() => {
					event().target.pause()
					pause(false)
				}}
				click={() => mute(!mute())}
				value={() => lotr_logo}
				style={() => `z_put bottom-[.25rem] w-[50%] ${pause() ? `hide` : ``}`}
			/>
		</D>
	)
}
