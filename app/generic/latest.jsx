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
import Tape from "~/common/tape"
import Snip from "~/common/snip"

export default () => {
	var data = state()

	construct(async () => {
		page.title = `Latest - Netflix`
		data(db?.get_all(`latest`))
	})

	return (
		<D style={`z_fit z-[1]`}>
			<Snip show_id={() => data()?.snip?.show_id} />
			<D
				style={`z_put z-[1] top-[70rem] w-full h-full ay_mid v2:pl-[1rem] v3:pl-[2rem] v4:pl-[2.5rem] v5:pl-[3rem] `}>
				{data()?.tapes?.map((v, i) => (
					<Tape show_ids={v?.show_ids} title={v?.title} i={i} />
				))}
			</D>
		</D>
	)
}
