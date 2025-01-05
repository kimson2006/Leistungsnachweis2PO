<script>
    export let form = {};
</script>

<main class="container mt-5">
    {#if form?.error}
        <div class="alert alert-danger text-center" role="alert">
            {form.error}
        </div>
    {:else if form?.success}
        <div class="alert alert-success text-center text-danger" role="alert">
            Cryptocurrency deleted successfully! Redirecting...
        </div>
        <script>
            setTimeout(() => {
                window.location.href = "/cryptocurrencies";
            }, 3000); // Redirect to cryptocurrencies after 3 seconds
        </script>
    {/if}
</main>

<style>
    :global(body) {
        background-color: #121212;
        color: #e0e0e0;
        font-family: 'Arial', sans-serif;
    }

    .container {
        max-width: 800px;
        margin: auto;
        text-align: center;
    }

    .alert {
        margin-top: 20px;
    }
</style>
