<script>
  export let data;
  export let form = {};
  let isSubmitting = false;
  let cryptoIdError = "";
  let amountError = "";
  let buyPriceError = "";

  async function handleFormSubmit(event) {
    if (validateForm()) {
      isSubmitting = true;
    } else {
      event.preventDefault();
    }
  }

  function validateForm() {
    const cryptoId = document.getElementById('cryptoId').value.trim();
    const amount = document.getElementById('amount').value;
    const buyPrice = document.getElementById('buyPrice').value;

    cryptoIdError = validateField('cryptoId', cryptoId);
    amountError = validateField('amount', amount);
    buyPriceError = validateField('buyPrice', buyPrice);

    if (cryptoIdError || amountError || buyPriceError) return false;

    return true;
  }

  function validateField(id, value) {
    if (!value) return "This field is required.";
    if (id === "cryptoId" && value.length !== 24) {
      return "Cryptocurrency ID must be 24 characters long.";
    }
    if (id === "amount" || id === "buyPrice") {
      if (isNaN(value) || value <= 0) return "Must be a positive number.";
    }
    return "";
  }

  function handleBlur(event) {
    const { id, value } = event.target;
    if (id === "cryptoId") cryptoIdError = validateField(id, value);
    if (id === "amount") amountError = validateField(id, value);
    if (id === "buyPrice") buyPriceError = validateField(id, value);
  }

  async function redirectAfterSuccess() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.href = `/portfolio/${data.portfolio._id}`;
  }
</script>

<main class="container mt-5">
  <h1 class="text-primary mb-4">Add Cryptocurrency to Portfolio</h1>

  {#if form?.error}
    <div class="alert alert-danger" role="alert">{form.error}</div>
  {/if}

  {#if form?.success}
    <div class="alert alert-success" role="alert">
      {form.message || "Cryptocurrency added successfully!"}
    </div>
    {#await redirectAfterSuccess()}
      <div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Redirecting...</span>
        </div>
        <p>Redirecting, please wait...</p>
      </div>
    {:then}
      <!-- Redirected successfully -->
    {/await}
  {/if}

  <!-- Your form goes here -->

  {#if data?.portfolio?._id}
    <form method="POST" action="?/addCrypto" on:submit={handleFormSubmit}>
      <input type="hidden" name="portfolio_id" value={data.portfolio._id} />

      <div class="mb-3">
        <label for="cryptoId" class="form-label">Cryptocurrency ID</label>
        <input
          type="text"
          id="cryptoId"
          name="cryptoId"
          required
          placeholder="Enter Cryptocurrency ID"
          class="form-control"
          on:blur={handleBlur}
          aria-describedby="cryptoIdError"
        />
        {#if cryptoIdError}
          <div id="cryptoIdError" class="text-danger" aria-live="polite" role="alert">{cryptoIdError}</div>
        {/if}
      </div>

      <div class="mb-3">
        <label for="amount" class="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          required
          placeholder="Enter Amount"
          class="form-control"
          on:blur={handleBlur}
          aria-describedby="amountError"
        />
        {#if amountError}
          <div id="amountError" class="text-danger" aria-live="polite" role="alert">{amountError}</div>
        {/if}
      </div>

      <div class="mb-3">
        <label for="buyPrice" class="form-label">Buy Price</label>
        <input
          type="number"
          id="buyPrice"
          name="buyPrice"
          required
          placeholder="Enter Buy Price"
          class="form-control"
          on:blur={handleBlur}
          aria-describedby="buyPriceError"
        />
        {#if buyPriceError}
          <div id="buyPriceError" class="text-danger" aria-live="polite" role="alert">{buyPriceError}</div>
        {/if}
      </div>

      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add Crypto"}
        {#if isSubmitting}
          <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
        {/if}
      </button>
    </form>
  {:else}
    <div class="alert alert-warning">
      No portfolio ID available. 
      <a href="/portfolio" class="btn btn-secondary mt-2">Go to Portfolios</a>
    </div>
  {/if}
</main>
