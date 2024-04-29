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

export default () => {
	var nav = route()
	var mute = state(true)
	var playing = state(false)
	var video_ref

	react(() => {
		if (playing()) video_ref?.pause()
		else video_ref?.play()
	})

	construct(async () => {
		page.title = `Watch - Netflix`
	})

	return (
		<D style={() => `z_fit z-[1] c_black a_row items-center w-full h-full `}>
			<video
				onClick={() => playing(!playing())}
				ref={video_ref}
				src={`/home/lotr_1.mp4`}
				poster="/home/lotr_1.png"
				muted={mute()}
				loop={true}
				class={`e_full h-[100vh] w-full z_put top-0 z-[2]`}
			/>
			<D style={() => `z_put bottom-0 c_grey_1 w-full h-[1rem] z-[2]`}>x</D>
		</D>
	)
}
