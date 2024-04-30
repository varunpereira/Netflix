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
import {show_nav} from "./config/state"

export default () => {
	var progress = state(0)
	var nav = route()
	var mute = state(true)
	var playing = state(false)
	var video_ref
	var time_left = state()

	react(() => {
		if (playing()) video_ref?.pause()
		else video_ref?.play()
	})

	construct(async () => {
		page.title = `Watch - Netflix`
		show_nav(false)
	})

	destruct(() => {
		show_nav(true)
	})

	var handleTimeUpdate = () => {
		progress((video_ref.currentTime / video_ref.duration) * 100)
		var duration = video_ref.duration
		var currentTime = video_ref.currentTime
		time_left(duration - currentTime)
	}

	var handleSliderChange = (e) => {
		video_ref.currentTime = video_ref.duration * (e.target.value / 100)
		progress(e.target.value)
	}

	var formatSeconds = (d) => {
		d = Number(d)
		var h = Math.floor(d / 3600)
		var m = Math.floor((d % 3600) / 60)
		var s = Math.floor((d % 3600) % 60)

		var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + ":" : "00:"
		var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + ":" : "00:"
		var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00"
		return hDisplay + mDisplay + sDisplay
	}

	return (
		<>
			<div style={() => `z_fit `}>
				<video
					onTimeUpdate={handleTimeUpdate}
					ref={video_ref}
					src={`/home/lotr_1.mp4`}
					poster="/home/lotr_1.png"
					muted={mute()}
					class={`e_full h-[100vh] w-full z-[-1]`}
				/>
				<div
					class={`z_put z-[1] top-0 left-0 mt-[1rem] v2:ml-[1rem] v3:ml-[2rem] v4:ml-[2.5rem] v5:ml-[3rem]`}>
					hi
				</div>
				<div class="z_put z-[2] bottom-0 left-0 a_row items-end h-[6rem] v2:mx-[1rem] v3:mx-[2rem] v4:mx-[2.5rem] v5:mx-[3rem]">
					<div class="a_row gap-[1rem]">
						<button onClick={() => playing(!playing())} type="button">
							{playing() === true ? "Play" : "Pause"}
						</button>
						<p>de</p>
					</div>
					<div class="a_row gap-[1rem]">
						<button type="button">Full</button>
						<button type="button">Full</button>
					</div>
				</div>

				<div
					class={`z_put z-[1] left-0 bottom-0 w-full h-[4rem] v2:mx-[1rem] v3:mx-[2rem] v4:mx-[2.5rem] v5:mx-[3rem]`}>
					<div class="a_row w-full z_put bottom-[3.7rem] right-[2rem]">
						<div class="w-full z_fit">
							<div
								class={`c_red z_put z-[3]  h-[.3rem] w-full top-[.75rem]`}
								style={`width:calc(${progress()}%)`}></div>
							<input
								type="range"
								class=" w-full h-[.3rem] cursor-pointer slider"
								value={progress()}
								onInput={handleSliderChange}
								step=".000000000001"
							/>
						</div>
						<p class="w-fit ml-[1rem] z_put z-[4] top-[-.5rem] right-0">
							{formatSeconds(time_left())}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
