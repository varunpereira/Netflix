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

var s = {
	// box:
	// data size
	x: (v) => `{width:${v}rem;}`,
	x_p: (v) => `{width:${v}%;}`,
	y: (v) => `{height:${v}rem;}`,
	y_p: (v) => `{height:${v}%;}`,
	x_min: (v) => `{min-width:${v}rem;}`,
	y_min: (v) => `{min-height:${v}rem;}`,
	x_max: (v) => `{max-width:${v}rem;}`,
	y_max: (v) => `{max-height:${v}rem;}`,
	// inside size
	il: (v) => `{padding-left:${v}rem;}`,
	ir: (v) => `{padding-right:${v}rem;}`,
	ix: (v) => `{padding-left:${v}rem;padding-right:${v}rem;}`,
	it: (v) => `{padding-top:${v}rem;}`,
	ib: (v) => `{padding-bottom:${v}rem;}`,
	iy: (v) => `{padding-top:${v}rem;padding-bottom:${v}rem;}`,
	// edge size
	el: (v) => `{border-left:${v}rem;}`,
	er: (v) => `{border-right:${v}rem;}`,
	ex: (v) => `{border-left:${v}rem;border-right:${v}rem;}`,
	et: (v) => `{border-top:${v}rem;}`,
	eb: (v) => `{border-bottom:${v}rem;}`,
	ey: (v) => `{border-top:${v}rem;border-bottom:${v}rem;}`,
	// outside size
	ol: (v) => `{margin-left:${v}rem;}`,
	or: (v) => `{margin-right:${v}rem;}`,
	ox: (v) => `{margin-left:${v}rem;margin-right:${v}rem;}`,
	ot: (v) => `{margin-top:${v}rem;}`,
	ob: (v) => `{margin-bottom:${v}rem;}`,
	oy: (v) => `{margin-top:${v}rem;margin-bottom:${v}rem;}`,
	// layer , position
	z: (v) => `{z-index:${v}}`,
	pl: (v) => `{left:${v}rem;}`,
	pr: (v) => `{right:${v}rem;}`,
	pt: (v) => `{top:${v}rem;}`,
	pb: (v) => `{bottom:${v}rem;}`,
	// layout see vars
	// other
	c: (v) => `{background-color:${v};}`,
	d: (v) => `{border-radius:${v}rem;}`, // disc
	// todo shadow
	// text:
	ts: (v) => `{font-size:${v}rem;}`,
	ty: (v) => `{line-height:${v};}`,
	tx: (v) => `{letter-spacing:${v};}`,
	tc: (v) => `{color:${v};}`,
	tf: (v) => `{font-family:${v};}`,
	tw: (v) => `{font-weight:${v};}`,
	tc_h: (v) => `:hover{color:${v};}`,
	// svg
	shape_c: (v) => `{fill:${v};}`,
}
/*
screens: {
			v1: "0px",
			v2: "320px",
			v3: "640px",
			v4: "768px",
			v5: "1024px",
			v6: "1280px",
		},
		replaces first . with ./
		@media screen and (min-width:800px){
 */

var convert_v1 = (v) => {
	var styleElement = document.getElementById("style")
	var existingStyles = styleElement.textContent
	var newStyles = ""
	v.split(/\s+/).forEach((c) => {
		var [key, value] = c.split("=")
		if (!(key in s)) return
		var cla = `${key}\\=${value}${s[key](value)}`.replace(".", "\\.")
		if (!existingStyles.includes(cla)) newStyles += `.${cla}`
	})
	if (newStyles) styleElement.textContent += newStyles
}

var convert_v2 = (v) => {
	var styleElement = document.getElementById("style")
	var existingStyles = styleElement.textContent
	var newStyles = ""
	v.split(/\s+/).forEach((c) => {
		var [key, value] = c.split("=")
		if (!(key in s)) return
		var cla = `@media screen and (min-width:320px){${key}\\=${value}${s[key](value)}}`.replace(
			".",
			"\\.",
		)
		if (!existingStyles.includes(cla)) newStyles += `.${cla}`
	})
	if (newStyles) styleElement.textContent += newStyles
}

var convert_v3 = (v) => {
	var styleElement = document.getElementById("style")
	var existingStyles = styleElement.textContent
	var newStyles = ""
	v.split(/\s+/).forEach((c) => {
		var [key, value] = c.split("=")
		if (!(key in s)) return
		var cla = `@media screen and (min-width:640px){${key}\\=${value}${s[key](value)}}`.replace(
			".",
			"\\.",
		)
		if (!existingStyles.includes(cla)) newStyles += `.${cla}`
	})
	if (newStyles) styleElement.textContent += newStyles
}

var convert_v4 = (v) => {
	var styleElement = document.getElementById("style")
	var existingStyles = styleElement.textContent
	var newStyles = ""
	v.split(/\s+/).forEach((c) => {
		var [key, value] = c.split("=")
		if (!(key in s)) return
		var cla = `@media screen and (min-width:1024px){${key}\\=${value}${s[key](value)}}`.replace(
			".",
			"\\.",
		)
		if (!existingStyles.includes(cla)) newStyles += `.${cla}`
	})
	if (newStyles) styleElement.textContent += newStyles
}

var convert_v5 = (v) => {
	var styleElement = document.getElementById("style")
	var existingStyles = styleElement.textContent
	var newStyles = ""
	v.split(/\s+/).forEach((c) => {
		var [key, value] = c.split("=")
		if (!(key in s)) return
		var cla = `@media screen and (min-width:1280px){${key}\\=${value}${s[key](value)}}`.replace(
			".",
			"\\.",
		)
		if (!existingStyles.includes(cla)) newStyles += `.${cla}`
	})
	if (newStyles) styleElement.textContent += newStyles
}

// structs
export var D = (props) => {
	// import css file and set innerhtml to it
	// onCleanup(() => {
	// })
	// var custom = props?.custom
	props?.v1 && convert_v1(props?.v1)
	props?.v2 && convert_v2(props?.v2)
	props?.v3 && convert_v3(props?.v3)
	props?.v4 && convert_v4(props?.v4)
	props?.v5 && convert_v5(props?.v5)
	return (
		<div
			onClick={props?.click}
			onMouseOver={props?.hover_in}
			onMouseLeave={props?.hover_out}
			onKeyDown={props?.key}
			// use:custom
			ref={props?.ref}
			v1={props?.css}
			class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}>
			{props.children}
		</div>
	)
}
export var T = (props) => {
	props?.v1 && convert_v1(props?.v1)
	props?.v2 && convert_v2(props?.v2)
	props?.v3 && convert_v3(props?.v3)
	props?.v4 && convert_v4(props?.v4)
	props?.v5 && convert_v5(props?.v5)
	return <p class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}>{props.children}</p>
}
export var B = (props) => {
	props?.v1 && convert_v1(props?.v1)
	props?.v2 && convert_v2(props?.v2)
	props?.v3 && convert_v3(props?.v3)
	props?.v4 && convert_v4(props?.v4)
	props?.v5 && convert_v5(props?.v5)
	return (
		<button type="button" onClick={props?.click} class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}>
			{props.children}
		</button>
	)
}
export var I = (props) => {
	props?.v1 && convert_v1(props?.v1)
	props?.v2 && convert_v2(props?.v2)
	props?.v3 && convert_v3(props?.v3)
	props?.v4 && convert_v4(props?.v4)
	props?.v5 && convert_v5(props?.v5)
	return <input
		type={props?.type}
		value={props?.value}
		placeholder={props.holder}
		onInput={props?.input}
		onClick={props?.click}
		onKeyDown={props?.key}
		ref={props?.ref}
		class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}
	/>
}
export var P = (props) => {
	props?.v1 && convert_v1(props?.v1)
	props?.v2 && convert_v2(props?.v2)
	props?.v3 && convert_v3(props?.v3)
	props?.v4 && convert_v4(props?.v4)
	props?.v5 && convert_v5(props?.v5)
	return (
		<img
			src={props.value}
			alt={props.def}
			onClick={props?.click}
			onMouseOver={props?.hover_in}
			onMouseLeave={props?.hover_out}
			onKeyDown={props?.key}
			// use:custom
			v1={props?.css}
			class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}
		/>
	)
}
export var V = (props) => {
	props?.v1 && convert_v1(props?.v1)
	props?.v2 && convert_v2(props?.v2)
	props?.v3 && convert_v3(props?.v3)
	props?.v4 && convert_v4(props?.v4)
	props?.v5 && convert_v5(props?.v5)
	return (
		<video
			// {...props}
			preload="none"
			poster={props?.def}
			loop={props?.rep}
			controls={props?.controls}
			muted={props?.mute}
			autoPlay={true} // must mute first
			playsinline
			onClick={props?.click}
			onMouseOver={props?.hover_in}
			onMouseLeave={props?.hover_out}
			onKeyDown={props?.key}
			ref={props?.ref}
			// use:custom
			class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}>
			<source src={props?.value} type={props?.type} />
			Browser doesn't support video tag.
		</video>
	)
}

// networks
export var auth = async (link) => {}

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
