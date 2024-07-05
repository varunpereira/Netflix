import {
	state,
	react,
	construct,
	destruct,
	write,
	path,
	page,
	req,
	dir,
	D,
	T,
	B,
	V,
	P,
} from "~/config/shop"
import {db} from "~/config/db"
import Tape from "~/pieces/tape"
import Snip from "~/pieces/snip"

export default () => {
	var shows = state()
	var home = state()

	construct(async () => {
		page.title = `My List - Netflix`
		shows(db?.get_all(`shows`))
		home(db?.get_all(`my_list`))
	})

	return (
		<D style={`z_fit z-[1]`}>
			<Snip show_id={() => home()?.show_id} />
			<D
				style={`z_put z-[1] top-[70rem] w-full h-full ay_mid v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] `}>
				{home()?.tapes?.map((v, i) => (
					<Tape
						data={() =>
							shows()
								?.slice((i + 1) * 18 - 18, (i + 1) * 18)
								.reverse()
						}
						title={v?.title}
						i={i}
					/>
				))}
			</D>
		</D>
	)
}
