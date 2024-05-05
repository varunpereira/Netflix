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
	var chosenSlider = state(null)
	var shows_filt = state([])
	var term = state()
	var path_par = path.search()

	react(() => {
		page.title = `Search Results - Netflix`
		term(path_par?.q.trim().toUpperCase())
		shows_filt(all_shows_data().filter((show) => show?.keywords.toUpperCase().includes(term())))
	})

	return (
		<div class="pt-[10rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem] hover:px-0 a_row ax_mid items-start gap-x-[.3rem] overflow-x-hidden overflow-y-visible">
			{shows_filt()
				?.slice(0, 5)
				.map((v, i) => (
					<div
						// style={"transition:width 1s, height 1s;"}
						class={`z_fit w-[14rem] h-[7rem] hover:h-[14rem] hover:w-[28rem] hover:mt-[-3.5rem] a_null `}>
						<img
							src={v?.poster_link}
							class={`z_put z-[0] w-full h-full aspect-[16/9] hover:z-[1] `}
						/>
					</div>
				))}
		</div>
	)
}
