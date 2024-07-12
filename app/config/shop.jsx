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
	z: (v) => `{z-index:${v};}`,
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

var sort = (cssString) =>{
  // Split the string into individual media queries
  const mediaQueries = cssString.match(/@media\([^)]+\)[^}]+}/g);
  // Create an object to group queries by min-width
  const groupedQueries = {};
  mediaQueries && mediaQueries.forEach(query => {
    // Extract min-width value
    const minWidth = query.match(/min-width:(\d+)px/);
    const width = minWidth ? parseInt(minWidth[1]) : 0;
    // Group queries by width
    if (!groupedQueries[width]) {
      groupedQueries[width] = [];
    }
    groupedQueries[width].push(query+'}\n');
  });
  // Sort widths in ascending order
  const sortedWidths = Object.keys(groupedQueries).sort((a, b) => parseInt(a) - parseInt(b));
  // Reconstruct the CSS string
  return sortedWidths.map(width => groupedQueries[width].join('')).join('');
}

// Example usage:
const css = `
@media(min-width:0px){.z\=0{z-index:0}}
@media(min-width:320px){.x_max\=60{max-width:60rem;}}
@media(min-width:1024px){.x_max\=120{max-width:120rem;}}
@media(min-width:0px){.z\=1{z-index:1}}
`

var vps = {
	v1:'0',
	v2:'320',
	v3:'640',
	v4:'768',
	v5:'1024',
	v6:'1280',
}

var engine = (cls) => {
	// return
	if (!cls) return
	var el = document.getElementById("style")
	var cur = el.textContent
	cls.split(/\s+/).forEach((c) => {
		var [key, value, vp] = c.split("=")
		if (!(key in s)) return
		if (vp in vps) vp = vps[vp]
		else vp = "0"
		var new_cl = `@media(min-width:${vp}px){.${key}\\=${value.replace(".", "\\.")}${
			vp !== "0" && `\\=${vp}`
		}${s[key](value)}}\n`
		if (cur.includes(new_cl)) return
		cur = cur.replace(
			`@media(min-width:${vp}px){._{_:_}}\n`,
			`@media(min-width:${vp}px){._{_:_}}\n${new_cl}`,
		)
	})
	el.textContent = cur
}

// structs
export var D = (props) => {
	// import css file and set innerhtml to it
	// onCleanup(() => {
	// })
	// var custom = props?.custom
	engine(props?.style)
	return (
		<div
			onClick={props?.click}
			onMouseOver={props?.hover_in}
			onMouseLeave={props?.hover_out}
			onKeyDown={props?.key}
			// use:custom
			ref={props?.ref}
			style={props?.css}
			class={props?.style}>
			{props.children}
		</div>
	)
}
export var T = (props) => {
	engine(props?.style)
	return <p class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}>{props.children}</p>
}
export var B = (props) => {
	engine(props?.style)
	return (
		<button type="button" onClick={props?.click} class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}>
			{props.children}
		</button>
	)
}
export var I = (props) => {
	engine(props?.style)
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
	engine(props?.style)
	return (
		<img
			src={props.value}
			alt={props.def}
			onClick={props?.click}
			onMouseOver={props?.hover_in}
			onMouseLeave={props?.hover_out}
			onKeyDown={props?.key}
			style={props?.css}
			class={`${props?.v1} ${props?.v2} ${props?.v3} ${props?.v4} ${props?.v5}`}
		/>
	)
}
export var V = (props) => {
	engine(props?.style)
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
