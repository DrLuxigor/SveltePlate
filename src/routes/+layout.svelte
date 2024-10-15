<script>
	import ThemeToggler from '$lib/components/theme/ThemToggler.svelte';
	import SignInStatus from '$lib/components/auth/SignInStatus.svelte';
	import '../app.css';
</script>

<header class="transition-color fixed top-0 z-50 flex h-16 w-full justify-center bg-white bg-opacity-50 px-6 shadow-md backdrop-blur-lg duration-300 dark:bg-slate-800 dark:bg-opacity-50 dark:text-white md:px-12">
	<div class="flex h-full w-full max-w-screen-2xl items-center justify-between gap-8 md:gap-16">
	  <a href="/">
		<div class="flex cursor-pointer items-center gap-2">
		  <span class="h-8 w-8 text-indigo-500"><img src="/icons/star.svg" alt="star logo"></span>
		  <h3 class="hidden text-xl font-normal sm:block md:text-2xl">
			Sveltelight
		  </h3>
		</div>
		</a>
	  <div class="flex-grow">Nav</div>
	  <div class="flex items-center gap-4">
		<ThemeToggler />
		<SignInStatus/>
	  </div>
	</div>
  </header>

<div>
	<slot />
</div>
