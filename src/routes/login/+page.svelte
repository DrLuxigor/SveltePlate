<script lang="ts">
    import { signInWithPopup, OAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
    import { clientAuth } from "$lib/firebase/client/firebase_client";
    import {goto} from "$app/navigation";
  
    const emailPattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    let errorMessage: string | undefined = undefined;

    let email = "";
    let password = "";
    let remember = false;

    function handleSubmit() {
        let valid = validateRequest();
        if(valid) {
          signInWithEmailAndPassword(clientAuth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log("email, pw success!");
    goto("/");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("email, pw error: " + errorMessage);
  });
        }
        
    }

    function validateRequest() {
        let form = document.getElementById("loginform") as HTMLFormElement;
        let valid = form.checkValidity();
         if (valid) return true;
        form.reportValidity();
        return false;
    }

    function microsoftLogin() {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        prompt: 'consent',
        tenant: '1d339b57-5944-4f94-9536-7116e2411fef',
      });
      signInWithPopup(clientAuth, provider)
      .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.
      // Get the OAuth access token and ID Token
    const credential = OAuthProvider.credentialFromResult(result);
    if(credential != null)  {
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
      console.log("Login Success");
      console.log("accessToken: " + accessToken);
      console.log("idToken: " + idToken);
      console.log("credential: " + JSON.stringify(credential));
      console.log("result: " + JSON.stringify(result));
      console.log("logged in user: " + clientAuth.currentUser?.displayName);
      goto("/");
    }
  })
  .catch((error) => {
    console.log("Login Error: " + error);
  });
    }
</script>

<div class="flex min-h-screen w-full items-center justify-center bg-[length:100%_100%] bg-no-repeat lg:dark:bg-[url('/bgs/login-bg.svg')]">
    <div class="flex rounded-2xl border-indigo-100 backdrop-blur-md dark:border-slate-700 md:border md:shadow-2xl">
      <div class="hidden min-h-full w-52 items-center justify-center rounded-l-2xl bg-indigo-500 bg-[url('/bgs/x.svg')] bg-cover bg-no-repeat lg:flex xl:w-80">
        <img src="/icons/star_white.svg" class="h-12 w-12 text-white" alt="icon"/>
      </div>
      <div class="flex flex-col items-center gap-8 px-8 py-16 sm:px-16 sm:py-32">
        <h1 class="text-2xl">Sign In</h1>
        <form class="flex w-80 flex-col gap-8 sm:w-96" id="loginform" on:submit|preventDefault={handleSubmit}>
          <input
            id="email"
            class="rounded-lg bg-inherit focus:ring-indigo-500"
            type="email"
            placeholder="user@example.com"
            pattern={emailPattern}
            required
            autoComplete="email"
            bind:value={email}
          />
          <div class="relative flex flex-col">
            <input
              id="password"
              class="rounded-lg bg-inherit focus:ring-indigo-500"
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              bind:value={password}
            />
            <a
              href="/login/forgot-password"
              class="absolute right-0 top-full cursor-pointer text-end text-gray-400 hover:underline"
            >
              Forgot Password?
          </a>
          </div>

          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              class="mr-2 h-5 w-5 rounded bg-inherit text-indigo-500 focus:ring-indigo-500"
              bind:value={remember}
            />
            <label for="remember">Remember me</label>
          </div>
          {#if errorMessage}
            <div>
                <p class="text-red-600">{errorMessage}</p>
            </div>
          {/if}
          <input
            type="submit"
            value="Sign In"
            class="button bg-indigo-500 text-white hover:bg-indigo-600 dark:hover:bg-indigo-400"
          />
        </form>
        <div class="flex w-80 items-center gap-2 sm:w-96">
          <div class="flex-grow border-b border-b-gray-400"></div>
          <span class="text-gray-400">or sign in with</span>
          <div class="flex-grow border-b border-b-gray-400"></div>
        </div>
        <div class="grid w-80 grid-cols-2 gap-4 sm:w-96">
          <div class="button relative flex items-center justify-center border bg-white font-semibold text-black hover:bg-gray-100 hover:bg-opacity-80">
            <svg
              class="h-6 w-6"
              viewBox="0 0 20 20"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <path
                d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
                fill="#4285F4"
              ></path>
              <path
                d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
                fill="#34A853"
              ></path>
              <path
                d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
                fill="#FBBC05"
              ></path>
              <path
                d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
                fill="#EA4335"
              ></path>
            </svg>

            <span class="w-full text-center">Google</span>
          </div>
          <button class="button relative flex items-center justify-center border bg-white font-semibold text-black hover:bg-gray-100 hover:bg-opacity-80"
          on:click={microsoftLogin}>
            <img
              src="https://microsoft.com/favicon.ico"
              class="left-4 h-6 w-6"
              alt="github logo"
            />
            <span class="flex-1 text-center">Mircosoft</span>
        </button>
        </div>
      </div>
    </div>
  </div>