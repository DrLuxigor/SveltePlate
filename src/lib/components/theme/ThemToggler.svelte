<script>
import {onMount} from 'svelte';

onMount(() => {
    setTheme();
})

function setTheme() {
  if (typeof window !== "undefined") {
    let theme = localStorage.getItem("theme");
    if ((theme && theme === "light") || theme === "dark") {
      if (theme === "dark") {
        document.getElementsByTagName("html")[0].classList.add("dark");
      } else {
        document.getElementsByTagName("html")[0].classList.remove("dark");
      }
    } else {
      toggleTheme();
    }
  }
}

function toggleTheme() {
  let theme = localStorage.getItem("theme");
  if ((theme && theme === "light") || theme === "dark") {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  } else {
    let prefDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefDark.matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
  theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.getElementsByTagName("html")[0].classList.add("dark");
  } else {
    document.getElementsByTagName("html")[0].classList.remove("dark");
  }
}
</script>


<button class="cursor-pointer rounded-lg p-2 hover:bg-slate-800 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10" on:click={toggleTheme}>
    <div class="hidden text-white dark:block h-6 w-6">
        <span class="h-6 w-6"><img src="/icons/sun.svg" alt="light theme icon"/></span>
    </div>
    <div class="text-slate-800 dark:hidden h-6 w-6">
        <span class="h-6 w-6"><img src="/icons/moon.svg" alt="dark theme icon" class="aspect-square h-full"/></span>
    </div>
</button>
