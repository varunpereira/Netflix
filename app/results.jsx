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
} from "~/config/shop"
import {shows} from '~/data/shows'

export default () => {
	var nav = route()
	var path_var = path.var()
	var chosenSlider = state(null)

	construct(() => {
		page.title = `Search Results - Netflix`
		write(path_var?.title)
	})

	react(() => {})

	var Tape = ({title, i}) => {
		return (
			<div class={`z_fit z-[${i === chosenSlider() ? "2" : "1"}] mt-[-5rem]`}>
				<div
					onMouseOver={() => chosenSlider(i)}
					onMouseLeave={() => chosenSlider(null)}
					class={`h-[260px] w-full a_row items-center justify-start gap-[.3rem] overflow-auto no_scroll`}>
					{dir(22)
						.fill()
						.map((v, i2) => (
							<img
								src={`/home/trending/${i2 + 1}.jpg`}
								class={`w-[300px] h-[130px] hover:h-[260px] hover:w-[400px] `}
							/>
						))}
				</div>
			</div>
		)
	}

	return (
		<div class="pt-[20rem] v2:px-[1rem] v3:px-[2rem] v4:px-[2.5rem] v5:px-[3rem]">
			<D
				style={() =>
					`w-full h-full mt-[-6rem] a_col gap-[4rem]`
				}>
				{shows().map((v, i) => (
					<Tape title={v} i={i} />
				))}
			</D>
		</div>
	)
}
