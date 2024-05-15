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
} from "~/config/shop"
import {all_shows_data} from "~/data/shows/all"

export default () => {
	var nav = route()
	var chosenSlider = state()
	var chosenSlide = state()
	var shows_filt = state([])
	var term = state()
	var path_par = path.search()
	var chosen_slider = state()

	construct(() => {
		page.title = `Search Results - Netflix`
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

	var results = react(() => {
		var term = path_par?.q.trim().toUpperCase() // path is like state so rerenders
		var get_results = shows_filt(
			all_shows_data().filter((show) => show?.keywords.toUpperCase().includes(term)),
		)
		var chunks = chunk_dir(get_results)
		return chunks
	})

	return (
		<D style={`fit_1 pt-[10rem] hover:px-0 dy_mid w-full h-full overflow-x-hidden`}>
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
								chosenSlide(i2)
							}}
							hover_out={() => {
								chosenSlider(false)
								chosenSlide(false)
							}}
							style={` ${
								chosenSlide() === i2 && chosenSlider() === i
									? `w-[28rem] h-[14rem] trans_start`
									: `w-[14rem] h-[7rem] trans_end`
							} aspect-[16/9] d_null cursor_pointer`}
						/>
					))}
				</D>
			))}
		</D>
	)
}
