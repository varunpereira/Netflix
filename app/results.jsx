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
	P,
	I,
	V,
	str,
	memo,
} from "~/config/shop"
import {all_shows_data} from "~/data/shows/all"

export default () => {
	var nav = route()
	var chosenSlider = state(null)
	var shows_filt = state([])
	var term = state()
	var path_par = path.search()
	var chosen_slider = state()

	react(() => {
		page.title = `Search Results - Netflix`
		term(path_par?.q.trim().toUpperCase())
	})

	var chunk_dir = (array) => {
		const chunkSize = 5
		const chunks = []
		for (let i = 0; i < array.length; i += chunkSize) {
			const chunk = array.slice(i, i + chunkSize)
			chunks.push(chunk)
		}
		return chunks
	}

	var results = memo(() => {
		// must call signal at least once, for this memo to rerun
		;[term()]
		var get_results = shows_filt(
			all_shows_data().filter((show) => show?.keywords.toUpperCase().includes(term())),
		)
		var chunks = chunk_dir(get_results)
		return chunks
	})

	return (
		<D
			style={`fit_1 pt-[10rem] hover:px-0 dy_mid w-full h-full overflow-x-hidden`}>
			{results().map((v, i) => (
				<D
					style={`z_fit z-[${
						i === chosenSlider() ? "1" : "0"
					}] w-full h-[14rem] dx_mid ay_mid gap-x-[.3rem] mt-[-3rem] `}>
					{v.map((v2, i2) => (
						<P
							value={v2?.poster_link}
							click={() => nav(`/watch/${v2?.id}`)}
							hover_in={() => {
								chosenSlider(i)
							}}
							css={"transition:width 1s .5s, height 1s .5s;"}
							style={`w-[14rem] h-[7rem] aspect-[16/9] hover:w-[28rem] hover:h-full d_null cursor_pointer `}
						/>
					))}
				</D>
			))}
		</D>
	)
}
