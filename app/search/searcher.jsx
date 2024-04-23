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
	V,
	P,
	I,
} from "~/globe/config/shop"
import {cart_icon, search_icon, close_icon, mic_icon} from "~/globe/asset/icon"

export default () => {
	var nav = route()
	var form_error = state()
	var form_data = state({search: ""})
	var suggest = state([])
	var suggest_pick = state(null)
	var suggest_on = state(true)
	var mic_on = state(false)
	var themes = ["all", "tech"]
	var theme = themes[0]
	var page = "1"

	var click_outside = (el, accessor = () => "") => {
		var on_click = (e) => !el.contains(e.target) && accessor()
		view.put_listen("click", on_click)
		clean(() => view.cut_listen("click", on_click))
	}

	var form_submit = async (term) => {
		term.trim() !== "" ? nav("/search/all/" + encodeURIComponent(term) + "/1") : ""
		suggest_on(false)
	}

	var get_suggest = async () => {
		suggest_on(true)
		suggest([]) // loading
		var res = await req("/search/suggest", {search: form_data().search, theme, page})
		suggest(res.prod)
	}

	var key = (e) => {
		if (e.key === "Enter") {
			form_submit(form_data().search)
		} else if (e.key === "Escape") {
			form_data({...form_data(), search: ""})
		} else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			var put_pick
			if (e.key === "ArrowDown") {
				put_pick = suggest_pick() === null ? 0 : (suggest_pick() + 1) % suggest().length
			} else if (e.key === "ArrowUp") {
				put_pick =
					suggest_pick() === null
						? suggest().length - 1
						: (suggest_pick() - 1 + suggest().length) % suggest().length
			}
			form_data({...form_data(), search: suggest()[put_pick].title})
			suggest_pick(put_pick)
		}
	}

	var put_mic = () => {
		if (window.hasOwnProperty("webkitSpeechRecognition")) {
			var recognition = new webkitSpeechRecognition()
			recognition.continuous = false
			recognition.interimResults = false
			recognition.lang = "en-US"
			mic_on(true)
			recognition.start()
			recognition.onresult = (e) => {
				suggest_on(false)
				form_data({...form_data(), search: e.results[0][0].transcript})
				recognition.stop()
				mic_on(false)
				nav("/search/all/" + encodeURIComponent(form_data().search) + "/1")
			}
			recognition.onerror = (e) => {
				recognition.stop()
				mic_on(false)
			}
		}
	}

	return (
		<D style={() => "c_black tc_white w_full h-[2rem] r_full z_fit mr-[1rem]"}>
			<I
				click={async () => {
					await get_suggest()
					suggest_on(true)
				}}
				type={() => "text"}
				value={() => form_data().search}
				input={async (e) => {
					form_data({...form_data(), search: e.target.value})
					await get_suggest()
				}}
				key={key}
				holder={() => "search..."}
				style={() => "c_black r_full px-[.8rem] w_full h_full o_null"}
			/>
			{form_data().search.trim() !== "" && (
				<D>
					<B click={() => form_data({...form_data(), search: ""})}>
						{close_icon({
							style: () =>
								"z_put c_black z-[4] ibc_white hover:ibc_grey right-[3.75rem] top-[.6rem] w-[.8rem] h-[.8rem]",
						})}
					</B>
					{suggest_on() === true && suggest().length >= 1 ? (
						<D
							custom={(e) => click_outside(e, () => suggest_on(false))}
							style={() => "z_put z-[2] a_col c_black top-[2.5rem] w_full r_1 p-[1rem]"}>
							{suggest().map((v, k) => (
								<B
									click={() => {
										form_data({...form_data(), search: v.title})
										form_submit(v.title)
									}}
									style={() =>
										"a_row hover:bg-gray-900 " + (suggest_pick() === k && "bg-gray-800")
									}>
									{v?.title}
								</B>
							))}
						</D>
					) : suggest_on() === true && suggest().length === 0 ? (
						<D style={() => "z_put z-[2] bottom-[2.5rem] w_full r_1 p-[1rem]"}>Loading...</D>
					) : (
						""
					)}
				</D>
			)}
			<B click={put_mic}>
				{mic_icon({
					style: () =>
						"z_put z-[4] ic_white hover:ic_grey right-[2.25rem] top-[.5rem] w-[1rem] h-[1rem]",
				})}
			</B>
			<B
				click={() => {
					form_submit(form_data().search)
				}}>
				{search_icon({
					style: () =>
						"z_put z-[4] ic_white hover:ic_grey right-[.5rem] top-[.3rem] w-[1.3rem] h-[1.3rem]",
				})}
			</B>
		</D>
	)
}
