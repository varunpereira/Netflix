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
import {shows_data} from "~/data/shows"

export default () => {
	var nav = route()
	var chosenSlider = state(null)
	var shows_filt = state([])
	var term = state()
	var urlParams = state()
	var path_par = path.search()

	react(() => {
		page.title = `Search Results - Netflix`
		term(path_par?.q.trim().toUpperCase())
		shows_filt(shows_data().filter((show) => show?.title.toUpperCase().includes(term())))
 	})

	return (
		<div class="pt-[10rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]">
			<D style={() => `w-full h-full a_col gap-[4rem]`}>
				<div class={`a_row_auto items-center justify-start gap-x-[.3rem] gap-y-[4rem] `}>
					{shows_filt().length > 0 ? shows_filt()?.map((v) => (
						<img src={v?.img_url} class={`w-[260px] h-[130px] `} />
					)) : <p>No results found for "{term()}"</p>}
				</div>
			</D>
		</div>
	)
}
