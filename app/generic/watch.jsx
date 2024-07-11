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
	view,
	D,
	T,
	B,
	V,
	P,
	I,
} from "~/config/shop"
import {PauseIcon, PlayIcon, VolumeIcon, MuteIcon, HelpIcon, ArrowLeftIcon} from "~/common/icon"
import {db} from "~/config/db"
import {show_nav} from "~/config/state"

export default () => {
	var nav = path?.nav()
	var progress = state()
	var mute = state(true)
	var playing = state(true)
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

	react(()=>{
		if (playing()) video?.play()
		else video?.pause()
	})

	destruct(() => {
		show_nav(true)
	})

	view.put_listen('keydown', (e) => {
		if(e.key === ` `) {
			playing(!playing())
		}
		else if(e.key === `m`) {
			mute(true)
		}
		else if(e.key === `f`) {
			toggleFullScreen()
		}
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
		var h_shown = h >= 1 ? h + ":" : ""
		var m_shown = m >= 0 ? (m <= 9 && h >= 1 ? "0" : "") + m + ":" : ""
		var s_shown = s >= 0 ? (s <= 9 ? "0" : "") + s : "0"
		return h_shown + m_shown + s_shown
	}

	var toggleFullScreen = () => {
		if (page.fullscreenElement) {
			return page.exitFullscreen()
		}
		if (page.body.requestFullscreen) {
			page.body.requestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	return (
		<D v1={`z_fit z-[0]`}>
			{progress() != null || true ? (
				<video
					src={show()?.snip_link?.trim() !== "" ? show()?.snip_link : "/shows/def.mp4"}
					onTimeUpdate={handleTimeUpdate}
					ref={video}
					preload="none"
					muted={mute()}
					playsInline
					autoPlay
					class={`c_full h-[100vh] x_full`}
				/>
			) : (
				<P value={show()?.cover_link} v1={`h-[100vh] x_full c_full`} />
			)}

			<B
				click={() => nav("/")}
				v1={`p_put z-[2] top-0 pl=0 mt-[1rem] w-8 h-8 stroke-white stroke-[.5rem] v2:ml-[1rem] v3:ml-[2rem] v4:ml-[2.5rem] v5:ml-[3rem]`}>
				<ArrowLeftIcon />
			</B>
			<D style="p_put z=1 bottom-0 pl=0 ax_same sx_bottom x_full mb-[.5rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]">
				<D style="ax_same">
					<B click={() => playing(!playing())} style="w-[1.5rem] fill-white">
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
				v1={`p_put z-[2] pl=0 bottom-[3rem] ax_same x_full h_auto v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]`}>
				<D style="z_fit z-[2] ax_right sx_mid x_full h-[.3rem]">
					<I
						type="range"
						value={progress() ? progress() : 0}
						input={handleSliderChange}
						step=".0000000000000001"
						style="slider mt-[1.1rem]"
					/>
					{progress() != null && (
						<D
							v1={`p_put z-[3] top-[.55rem] c_red x_full y_full`}
							css={`
								width: calc(${progress()}%);
							`}
						/>
					)}
				</D>
				<T style="ml-[1rem] ">{formatSeconds(time_left())}</T>
			</D>
		</D>
	)
}
