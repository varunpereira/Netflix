// import {state, react, write, d, t, b, i, p, route, req, globe} from "~/globe/shop"

// export default ({prod}) => {
// 	var nav = route()
// 	var flaw = state()

// 	var cart_put = async () => {
// 		if (prod.stock === 0) {
// 			return flaw("This product is out of stock.")
// 		}
// 		var res = await req("/cart/put", {
// 			prod,
// 			prod_size: 1,
// 		})
// 		return globe({...globe(), cart_size: (globe().cart_size += 1)})
// 	}

// 	return d(
// 		{style: () => "c_white tc_black r_1 w-[10rem] h-[20rem] ts_1 z_fit"},
// 		b(
// 			{click: () => nav("/prod/" + prod._id), style: () => "w_full "},
// 			p({value: () => prod.pic[0].url, style: () => "w-[10rem] h-[10rem] rt_1 w_full e_full"}),
// 		),
// 		d(
// 			{style: () => "p-[.5rem] "},
// 			b(
// 				{click: () => nav("/prod/" + prod._id), style: () => "hover:underline ta_left"},
// 				() => prod.title,
// 			),
// 			t({style: () => "z_put right-[.5rem] bottom-[.5rem]"}, "$" + prod.price),
// 			b(
// 				{
// 					click: cart_put,
// 					style: () => "z_put left-[.5rem] bottom-[.5rem] c_black tc_white r_1 p-[.5rem]",
// 				},
// 				() => "Add",
// 			),
// 		),
// 	)
// }
