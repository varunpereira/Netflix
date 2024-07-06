import {createSignal, createMemo, onMount, onCleanup} from "solid-js"
import {useNavigate, useLocation, useSearchParams, useParams} from "@solidjs/router"

export var state = (def) => {
	var [get, set] = createSignal(def)
	return (put) => (put !== undefined ? set(put) : get())
}
export var react = createMemo // any state inside is set in piece it runs
export var construct = onMount
export var destruct = onCleanup
export var write = console.log
export var path = {
	nav: useNavigate,
	nav_full: (link) => (window.location.href = link),
	route: useLocation,
	props: useParams,
	search: () => useSearchParams()[0],
	encode: encodeURIComponent,
	decode: decodeURIComponent,
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
export var cookie = (req_cookie) => {
	if (req_cookie == null) return {}
	var cookies = () => parseCookie(req_cookie)
	if (cookies()?.cookie != null) return any(cookies()?.cookie)
}
export var any = JSON.parse // eg bool

// generic
export var math = Math
export var num = {
	is_int: (v) => Number.isInteger(v),
}
export var date = Date
export var dir = Array
export var dic = Object

// structs
export var D = (props) => {
	// var custom = props?.custom
	return (
		<div
			onClick={props?.click}
			onMouseOver={props?.hover_in}
			onMouseLeave={props?.hover_out}
			onKeyDown={props?.key}
			// use:custom
			ref={props?.ref}
			style={props?.css}
			class={props.style}>
			{props.children}
		</div>
	)
}
export var T = (props) => <p class={props.style}>{props.children}</p>
export var B = (props) => (
	<button type="button" onClick={props?.click} class={props.style}>
		{props.children}
	</button>
)
export var I = (props) => (
	<input
		type={props?.type}
		value={props?.value}
		placeholder={props.holder}
		onInput={props?.input}
		onClick={props?.click}
		onKeyDown={props?.key}
		ref={props?.ref}
		class={props?.style}
	/>
)
export var P = (props) => (
	<img
		src={props.value}
		alt={props.def}
		onClick={props?.click}
		onMouseOver={props?.hover_in}
		onMouseLeave={props?.hover_out}
		onKeyDown={props?.key}
		// use:custom
		style={props?.css}
		class={props.style}
	/>
)
export var V = (props) => (
	<video
		// {...props}
		poster={props?.def}
		loop={props?.rep} // must mute first
		controls={props?.controls}
		muted={props?.mute}
		autoPlay={true} 
		playsinline
		onClick={props?.click}
		onMouseOver={props?.hover_in}
		onMouseLeave={props?.hover_out}
		onKeyDown={props?.key}
		ref={props?.ref}
		// use:custom
		class={props?.style}>
		<source src={props?.value} type={props?.type} />
		Browser doesn't support video tag.
	</video>
)

// networks
export var auth = async (link) => {
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