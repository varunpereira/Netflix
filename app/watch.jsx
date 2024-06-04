import {
	state,
	react,
	construct,
	destruct,
	write,
	path,
	page,
	timer,
	req,
	dir,
	D,
	T,
	B,
	V,
	P,
	I,
} from "~/config/shop"
import {PauseIcon, PlayIcon, VolumeIcon, MuteIcon, HelpIcon, ArrowLeftIcon} from "~/pieces/icon"
import {db} from "~/config/db"
import {show_nav} from "~/config/state"

export default () => {
	var nav = path?.nav()
	var progress = state()
	var mute = state(false)
	var playing = state(false)
	var video
	var time_left = state()
	var show_id = path.props()?.id
	var show = state()

	construct(async () => {
		page.title = `Watch - Netflix`
		show_nav(false)
		show(db?.get_all(`shows`)?.find((show) => show?.id == show_id))
		page.title = `${show()?.title} - Netflix`
	})

	destruct(() => {
		show_nav(true)
	})

	var handleTimeUpdate = () => {
		var duration = video.duration // sec
		var currentTime = video.currentTime
		progress((currentTime / duration) * 100)
		time_left(duration - currentTime)
	}

	var handleSliderChange = (e) => {
		video.currentTime = video.duration * (e.target.value / 100)
		// progress(e.target.value)
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

	var toggleFullScreen = () => {
		if (page.fullscreenElement) {
			return page.exitFullscreen()
		}
		if (page.body.requestFullscreen) {
			page.body.requestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			/* Safari */
			video.webkitRequestFullscreen()
		}
	}

	return (
		<D style={`z_fit z-[0]`}>
			{progress() != null ? (
				<video
					onTimeUpdate={handleTimeUpdate}
					ref={video}
					src={
						show()?.id == 153
							? show()?.full_link
							: show()?.snip_link?.trim() !== ""
							? show()?.snip_link
							: "/shows/def.mp4"
					}
					muted={mute()}
					playsInline
					class={`c_full h-[100vh] w-full`}
				/>
			) : (
				<P value={show()?.cover_link} style={`h-[100vh] w-full overflow-hidden`} />
			)}

			<B
				click={() => nav("/")}
				style={`z_put z-[2] top-0 left-0 mt-[1rem] w-8 h-8 stroke-white stroke-[.5rem] v2:ml-[1rem] v3:ml-[2rem] v4:ml-[2.5rem] v5:ml-[3rem]`}>
				<ArrowLeftIcon />
			</B>
			<D style="z_put z-[1] bottom-0 left-0 ax_same sx_bottom w-full mb-[.5rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]">
				<D style="ax_same">
					<B
						click={() => {
							if (!progress()) {
								progress(0)
								playing(false)
							}
							if (!playing()) {
								video.play()
								playing(true)
							} else {
								video.pause()
								playing(false)
							}
						}}
						style="w-[1.5rem] fill-white">
						{playing() === true ? <PauseIcon /> : <PlayIcon />}
					</B>
					<B click={() => mute(!mute())} style="ml-[1rem] w-[2rem]">
						{mute() ? <MuteIcon style="fill-white" /> : <VolumeIcon style="fill-white" />}
					</B>
					<T style="ml-[1rem] mt-[.3rem]">{show()?.title}</T>
				</D>
				<D style="ax_same">
					<B style="w-[2rem] fill-transparent stroke-white stroke-[.2rem]">
						<HelpIcon />
					</B>
					<B style="ml-[1.2rem] fill-white">
						<P value="/icons/full_screen.png" style="w-6 h-6" click={toggleFullScreen} />
					</B>
				</D>
			</D>

			<D
				style={`z_put z-[2] left-0 bottom-[3rem] ax_same w_full h_auto v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]`}>
				<D style="z_fit z-[2] ax_right sx_mid w_full h-[.3rem]">
					<I
						type="range"
						value={progress() ? progress() : 0}
						input={handleSliderChange}
						step=".0000000000000001"
						style="slider mt-[1.1rem]"
					/>
					{progress() != null && (
						<D
							style={`z_put z-[3] top-[.55rem] c_red w-full h_full`}
							css={`
								width: calc(
									${progress() < 25
										? progress() + 0.25
										: progress() > 75
										? progress() - 0.75
										: progress()}%
								);
							`}
						/>
					)}
				</D>
				<T style="ml-[1rem] ">{formatSeconds(time_left())}</T>
			</D>
		</D>
	)
}
