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
	num,
	D,
	T,
	B,
	P,
	I,
	V,
	str,
} from "~/config/shop"
import {db} from "~/config/db"

export default () => {
	var nav = route()
	var path_par = path.search()
	var shows = state([])
	var sel_tape = state()
	var sel_slide = state(false)
	var show_vid = state(false)

	construct(() => {
		page.title = `Search Results - Netflix`
	})

	var chunk_dir = (v) => {
		var chunkSize = 5
		var chunks = []
		for (var i = 0; i < v.length; i += chunkSize) {
			var chunk = v.slice(i, i + chunkSize)
			chunks.push(chunk)
		}
		return chunks
	}

	react(() => {
		if (num.is_int(sel_tape())) {
			var timer = setTimeout(() => {
				show_vid(true)
			}, 2000)
			destruct(() => clearTimeout(timer))
		} else {
			show_vid(false)
		}
	})

	var results = react(() => {
		var term = path_par?.q.trim().toUpperCase() // path is like state so rerenders
		var get_results = shows(
			db?.get(`shows`)?.filter((show) => show?.keywords.toUpperCase().includes(term)),
		)
		var chunks = chunk_dir(get_results)
		return chunks
	})

	return (
		<D style={`fit_1 pt-[10rem] hover:px-0 ay_mid w-full h-full overflow-x-hidden`}>
			{results().map((v, i) => (
				<D
					style={`z_fit z-[${
						i === sel_tape() ? "1" : "0"
					}] w-full h-[14rem] ax_mid sx_mid gap-x-[.3rem] mt-[-3rem] `}>
					{v.map((v2, i2) => (
						<D
							hover_in={() => {
								sel_tape(i)
								sel_slide(i2)
							}}
							hover_out={() => {
								sel_tape(false)
								sel_slide(false)
							}}
							click={() => nav(`/watch/${v2?.id}`)}
							css={`
								background-image: url(${v2?.cover_link});
								background-size: 100% 100%;
								background-repeat: no-repeat;
							`}
							style={`a_norm aspect-[16/9] 
					w-[14rem] h-[7rem]
					a_norm cursor_pointer
					trans_end
					hover:trans_start
					hover:w-[28rem] hover:h-[14rem] overflow-hidden`}>
							{sel_slide() === i2 && sel_tape() === i && show_vid() ? (
								<>
									<video
										src={v2?.snip_link?.trim() !== "" ? v2?.snip_link : "/shows/intro.mp4#t=2"}
										playsinline
										autoplay
										muted
										loop
										class="c_full z-[4] w-[30rem] h-[14rem]"
									/>
									<T style={`ml-[.5rem] mt-[-3rem] z-[5] a_null`}>{v2?.title}</T>
								</>
							) : (
								<P value={v2?.cover_link} style={`w-full h-full`} />
							)}
						</D>
					))}
				</D>
			))}
		</D>
	)
}
