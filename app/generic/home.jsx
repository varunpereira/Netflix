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
	P
} from "~/config/shop"
import {db} from "~/config/db"
import Tape from "~/common/tape"
import Snip from "~/common/snip"

export default () => {
	var data = state()

	construct(async () => {
		page.title = `Home - Netflix`
		data(db?.get_all(`home`))
	})

	// todo hover state, if many values eg width%, use html style attrib via css prop `width:${width}`

	return (
		<D style={`p_fit pt=12=v2 z=1 x_full pl=0 tc=red tc=blue=v3`}>
				TEST
			{/* <div class='x1 x2 '>d</div> */}
			{/* <Snip show_id={() => data()?.snip?.show_id} /> */}
			{/* <D
				v1={`p_put z=1 pt=70 x_full y_full ay_core`}
				v2={`il=1`}
				v3={`il=2`}
				v4={`il=2.5`}
				v5={`il=3`}>
				{data()?.tapes?.map((v, i) => (
					<Tape show_ids={v?.show_ids} title={v?.title} i={i} />
				))}
			</D> */}
		</D>
	)
}
