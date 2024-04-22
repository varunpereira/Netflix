import {
	state,
	react,
	write,
	d,
	t,
	b,
	i,
	v,
	route,
	globe,
	page,
	req,
	path,
} from "~/globe/shop"
import prod_short from "~/prod/short"
import pager from "~/globe/piece/pager"

export default () => {
	var nav = route()
	var path_var = path.var()
	var prod = state([])
	var pages = state()

	react(async () => {
		var res = await req("/search/result", {
			search: path_var?.term,
			theme: path_var?.theme,
			page: path_var?.page,
		})
		prod(res.prod)
		pages(res.pages)
	})

	return page(
		{title: () => "Result", status: () => "pub", style: () => "fit_1"},
		d({style: () => ""}, () =>
			prod().length === 0
				? t({}, () => "No results for " + decodeURIComponent(path_var?.term))
				: d(
						{},
						d(
							{style: () => "a_row_auto gap-[1rem] mb-[1rem]"},
							prod().map((v, k) => prod_short({prod: v})),
						),
						pager({
							cur: () => path_var?.page,
							size: () => pages(),
							link: () => "/search/all/" + path_var?.term,
						}),
				  ),
		),
	)
}
