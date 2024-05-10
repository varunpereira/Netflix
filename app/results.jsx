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
		[term()]
		var get_results = shows_filt(
			all_shows_data().filter((show) => show?.keywords.toUpperCase().includes(term())),
		)
		var chunks = chunk_dir(get_results)
		return chunks
	})

	return (
		<div class="pt-[10rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem] hover:px-0 dy_mid gap-y-[3rem] overflow-x-hidden overflow-y-visible">
			{results().map((v, i) => (
				// JSON.stringify(v.length)
				<div class='dx_mid'>
					{v.map((v2, i2) => (
						<div
							// style={"transition-property:width; transition-duration: 2s; transition-delay: 2s;"}
							class={`z_fit w-[14rem] h-[7rem] hover:h-[14rem] hover:w-[28rem] hover:mt-[-3.5rem] d_null `}>
							<img
								src={v2?.poster_link}
								class={`z_put z-[0] w-full h-full aspect-[16/9] hover:z-[1] `}
							/>
						</div>
					))}
				</div>
			))}
		</div>
	)
}
