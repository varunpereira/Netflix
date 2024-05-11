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
	path,
	D,
	T,
	B,
	V,
	P,
} from "~/config/shop"
import {show_nav} from "~/config/state"
import {PauseIcon, PlayIcon, VolumeIcon, MuteIcon, HelpIcon, ArrowLeftIcon} from "~/pieces/icon"
import {all_shows_data} from "~/data/shows/all"

export default () => {
	var nav = route()
	var progress = state(0)
	var mute = state(true)
	var playing = state(true)
	var video_ref
	var time_left = state()
	var show_id = path.props()?.id
	var show = state()

	react(() => {
		if (!playing()) video_ref?.pause()
		else video_ref?.play()
	})

	construct(async () => {
		page.title = `Watch - Netflix`
		show_nav(false)
		show(all_shows_data().find((show) => show?.id == show_id))
		page.title = `${show()?.title} - Netflix`
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

	var openFullscreen = () => {
		if (video_ref.requestFullscreen) {
			video_ref.requestFullscreen();
		} else if (video_ref.webkitRequestFullscreen) { /* Safari */
			video_ref.webkitRequestFullscreen();
		} else if (video_ref.msRequestFullscreen) { /* IE11 */
			video_ref.msRequestFullscreen();
		}
	}

	return (
		<>
			<div style={() => `z_fit z-[0]`}>
				<video
					onTimeUpdate={handleTimeUpdate}
					ref={video_ref}
					src={`/shows/snippets/lotr_1.mp4`}
					poster="/shows/snippets/lotr_1.png"
					muted={mute()}
					class={`e_full h-[100vh] w-full z-[-1]`}
				/>
				<button
					type="button"
					onClick={()=>nav('/')}
					class={`z_put z-[2] top-0 left-0 mt-[1rem] w-8 h-8 stroke-white stroke-[.5rem] v2:ml-[1rem] v3:ml-[2rem] v4:ml-[2.5rem] v5:ml-[3rem]`}>
					<ArrowLeftIcon />
				</button>
				<div class="z_put z-[1] bottom-0 left-0 dx_right dx_equal ay_bottom w-full h-fit my-[.5rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]">
					<div class="dx_right gap-[1rem]">
						<button onClick={() => playing(!playing())} type="button" class="w-[1.5rem] fill-white">
							{playing() === true ? <PauseIcon /> : <PlayIcon />}
						</button>
						<button type="button" class="w-[2rem] fill-white">
							<VolumeIcon />
						</button>
						<p class='mt-[.3rem]'>{show()?.title}</p>
					</div>
					<div class="dx_right gap-[1.2rem]">
						<button type="button" class="w-[2rem] fill-transparent stroke-white stroke-[.2rem]">
							<HelpIcon />
						</button>
						<button type="button" class="fill-white">
							<img src='/icons/full_screen.png' class='w-6 h-6' onClick={openFullscreen}/>
						</button>
					</div>
				</div>

				<div
					class={`z_put z-[2] left-0 bottom-[3rem] dx_right w-full h-fit v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]`}>
					<div class="z_fit w-full h-full">
						<div
							class={`c_red z_put z-[3]  h-[.3rem] w-full top-[.75rem]`}
							style={`width:calc(${progress()}%)`}></div>
						<input
							type="range"
							class=" h-[.3rem] cursor-pointer slider"
							value={progress()}
							onInput={handleSliderChange}
							step=".000000000001"
						/>
					</div>
					<p class="w-fit ml-[1rem] ">{formatSeconds(time_left())}</p>
				</div>
			</div>
		</>
	)
}
