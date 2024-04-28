import {defineConfig} from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 4000,
	},
	publicDir:'assets', // public
	build: {
		outDir: "build", // dist
		target: "esnext",
	},
	resolve: {
		alias: {
			"~": "/app",
		},
	},
})
