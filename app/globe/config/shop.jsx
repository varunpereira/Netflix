import {createSignal, createEffect, onMount, onCleanup} from "solid-js"
import {useNavigate, useSearchParams, useParams} from "@solidjs/router"

export var state = (def) => {
	var [get, set] = createSignal(def)
	return (put) => (put !== undefined ? set(put) : get())
}

export var react = createEffect

export var construct = onMount

export var destruct = onCleanup

export var write = console.log

export var route = useNavigate

export var nav_full = (link) => (window.location.href = link)

export var path = {
	get: () => window.location.pathname,
	var: useParams,
	par: () => useSearchParams()[0],
}

export var page = document

export var view = {
	width: () => window.innerWidth,
	height: () => window.innerHeight,
	put_listen: (id, fn) => window.addEventListener(id, fn),
	cut_listen: (id, fn) => () => window.removeEventListener(id, fn),
}

export var timer = {
	put: (fn, time) => setInterval(fn, time),
	cut: (fn) => clearInterval(fn),
}

export var scroll = (id) => document.getElementById(id).scrollIntoView({behavior: "smooth"})

// parse
export var str = JSON.stringify
export var num = Number
export var cookie = (req_cookie) => {
	if (req_cookie == null) return {}
	var cookies = () => parseCookie(req_cookie)
	if (cookies()?.cookie != null) return any(cookies()?.cookie)
}
export var any = JSON.parse // eg bool

// generic
export var math = Math
export var date = Date
export var dir = Array
export var dic = Object

// structs
export var D = ({style = () => "", key = () => "", custom = () => "", children, ...rest}) => {
	return (
		<div onKeyDown={key} use:custom class={style()} {...rest}>
			{children}
		</div>
	)
}

export var T = ({style = () => "", children, ...rest}) => (
	<p class={style()} {...rest}>
		{children}
	</p>
)

export var B = ({style = () => "", click = () => "", children, ...rest}) => (
	<button onClick={click} class={style() + " o_null"} type="button" {...rest}>
		{children}
	</button>
)

export var I = ({
	style = () => "",
	type = () => "text",
	value = () => "",
	input = () => "",
	click = () => "",
	holder = () => "",
	key = () => "",
	...rest
}) => (
	<input
		class={style() + " o_null"}
		type={type()}
		value={value()}
		placeholder={holder()}
		onInput={input}
		onClick={click}
		onKeyDown={key}
		{...rest}
	/>
)

export var P = ({
	style = () => "",
	value = () => "",
	def = () => "",
	hover_in = () => "",
	hover_out = () => "",
	click = () => "",
	...rest
}) => (
	<img
		class={style()}
		src={value()}
		alt={def()}
		onMouseOver={hover_in}
		onMouseLeave={hover_out}
		onClick={click}
		{...rest}
	/>
)

export var V = ({
	style = () => "",
	value = () => "",
	def = () => "",
	rep = () => true,
	type = () => "",
	controls = () => false,
	mute = () => true,
	hover_in = () => "",
	hover_out = () => "",
	click = () => "",
	...rest
}) => (
	<video
		{...rest}
		class={style()}
		poster={def()}
		loop={rep()}
		controls={controls()}
		muted={mute()}
		playsinline
		onMouseOver={hover_in}
		onMouseLeave={hover_out}
		onClick={click}>
		<source src={value()} type={type()} />
		Browser doesn't support video tag.
	</video>
)

// separate piece
export var auth = async (link) => {
	try {
		var res = await req("/login/auth_get")
		// write(res?.user?.email)
		var path_get = path.get()
		link !== "pub" && path_get !== "/signin" && res?.user?.email?.startsWith("@")
			? nav_full("/signin")
			: ""
		return globe({
			email: !res?.user?.email?.startsWith("@") ? res?.user?.email : null,
			cart_size: res?.cart_size,
		})
	} catch (flaw) {
		write(flaw)
	}
}

export var req = async (link = "", value = {}) => {
	var response = await fetch(
		(process.env.NODE_ENV === "production"
			? import.meta.env.VITE_be_domain
			: import.meta.env.VITE_be_domain_dev) + link,
		{
			method: "POST",
			body: JSON.stringify(value),
			credentials: "include",
		},
	)
	return response.json()
}

export var env = import.meta.env
