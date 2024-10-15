<script>
    import { clientAuth } from '$lib/firebase/client/firebase_client';
    import { onAuthStateChanged } from 'firebase/auth';
    
    onAuthStateChanged(clientAuth, (user) => {
        if (user) {
            console.log("User logged in..." + user.uid);
            console.log("displayName: " + user.displayName);
            displayName = user.displayName;
            if(displayName == null) {
                displayName = user.email;
            }
        } else {
            console.log("user logged out...");
            displayName = null;
        }
    })

    let displayName = clientAuth.currentUser?.displayName ?? null;

    function logout() {
        clientAuth.signOut();
    }
</script>

{#if displayName == null}
    <a class="bg-indigo-500 button text-white hover:bg-indigo-600" href="/login">Login</a>
{:else}
    <button on:click={logout}>{displayName}</button>
{/if}
