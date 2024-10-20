import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }: any) {
    console.log("content: " + params.content);
	return {
        content: params.content
    }
}