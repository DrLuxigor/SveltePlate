/** @type {import('./$types').RequestHandler} */
export function GET({ url }:any) {
    console.log("Login returned: " + url.searchParams.get("code"));

	return new Response(String(url));
}