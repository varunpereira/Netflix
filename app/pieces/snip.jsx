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
	D,
	T,
	B,
	P,
	I,
	V,
} from "~/config/shop"
import {MuteIcon, VolumeIcon} from "~/pieces/icon"
import {db} from "~/config/db"

export default (props) => {
	var nav = path?.nav()
	var mute = state(true)
	var video_ref
	var playing = state(false)
	var {show_id} = props
	var show = state()

	construct(() => {
		show(db?.get_one_by_id(`shows`, show_id()))
	})

	var handleTimeUpdate = () => {
		if (video_ref.currentTime >= 104) {
			video_ref.currentTime = 0
		}
	}

	react(() => {
		if (playing()) {
			video_ref?.play()
		} else video_ref?.pause()
	})

	return (
		<>
			<D
				style={
					"z_put z-[1] left-0 top-[12rem] w-[15rem] v3:w-[30rem] h_full v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] ts_2 tw_5 "
				}>
				<P value={show()?.logo_link} />
				<T style={`my-[1rem]`}>{show()?.details}</T>
				<D style={`ax_right`}>
					<B
						click={() => nav(`/watch/${show()?.id}`)}
						style={`c_black opacity-[.7] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] text-shadow-xl`}>
						<T>Play</T>
					</B>
					<B
						style={`ml-[.75rem] c_black opacity-[.7] px-[1.5rem] rounded-[.1rem] py-[.4rem] px-[3rem] `}>
						My List
					</B>
				</D>
			</D>
			<B
				style={`z_put z-[1] right-[2.5rem] top-[30rem] opacity w-[1.75rem] h-[1.75rem] c_black rounded-full opacity-[.7] `}
				click={() => mute(!mute())}>
				{mute() ? <MuteIcon style='fill-white'/> : <VolumeIcon style='fill-white'/>}
			</B>
			<D
				style={"z_put top-[0rem] bg-gradient-to-b from-[#141414] to-transparent w_full h-[4rem]"}
			/>
			<video
				ref={video_ref}
				onTimeUpdate={handleTimeUpdate}
				src={show()?.snip_link}
				playsinline
				autoplay
				muted={mute()}
				loop
				class="w-full h-[50rem] c_norm"
			/>
			<D
				style={
					"z_put z-[0] top-[38rem] bg-gradient-to-b from-transparent to-[#141414] w_full h-[12rem]"
				}
			/>
		</>
	)
}
