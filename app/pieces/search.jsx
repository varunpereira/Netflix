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
	D,
	T,
	B,
	P,
	I,
	V,
} from "~/config/shop"
import {SearchIcon, CrossIcon} from "~/pieces/icon"

export default () => {
	var nav = route()
	var see_search = state(false)
	var search_field
	var form = state({search: ""})

	var get_results = () => {
		form().search.trim() !== "" && nav("/search?q=" + form().search)
	}

	return (
		<>
			{!see_search() && (
				<B
					click={() => {
						see_search(true)
						search_field?.focus()
					}}
					style={`v4:ml-[1.2rem] mt-[1rem] v4:mt-0 ay_mid`}>
					<SearchIcon />
				</B>
			)}
			<D
				css={"transition: width 1s ease-in-out;"}
				style={`ax_right sx_mid border-white px-[.1rem] c_black mt-[1rem] v4:mt-[0rem] 
							${!see_search() ? `size_0` : `w-full v4:w-[14rem] h-[1.7rem] border-[.1rem]`}`}>
				<B
					click={get_results}>
					<SearchIcon />
				</B>
				<I
					ref={search_field}
					value={form().search}
					input={(e) => {
						form({...form(), search: e.target.value})
						get_results()
					}}
					holder={"Title, people, genres"}
					style={`c_black tc_white ml-[.3rem] w-full`}
				/>
				{form().search.trim() !== "" && (
					<B
						click={() => form({...form(), search: ""})}
						style={`ml-[.2rem] mr-[.3rem] w-[.75rem] h-[.75rem] stroke-white stroke-[1rem]`}>
						<CrossIcon />
					</B>
				)}
			</D>
		</>
	)
}
