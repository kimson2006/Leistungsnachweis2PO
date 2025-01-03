<script>
  export let data = {};
  export let error = null;
  export const form = {};

  function handleDelete(event) {
    if (!confirm("Are you sure you want to delete this portfolio?")) {
      event.preventDefault();
    }
  }
</script>

<main class="container mt-5">
  <!-- Exit Button -->
  <div class="exit-container">
    <a href="/portfolio" class="btn btn-outline-light btn-sm">Exit</a>
  </div>

  {#if error}
    <div class="alert alert-danger text-center" role="alert">
      {error || "An unexpected error occurred."}
    </div>
  {:else}
    <div class="details-header mb-4">
      <h1 class="display-4 text-white text-center">Portfolio Details: {data.portfolio.name}</h1>
      <div class="wallet-address-container">
        <p class="text-light">Wallet Address: {data.portfolio.walletAddress}</p>
        <!-- Updated deletePortfolio form -->
        <form method="POST" action="/portfolio/deletePortfolio">
          <input type="hidden" name="portfolio_id" value="{data.portfolio._id}" />
          <button type="submit" class="btn btn-danger btn-sm">Delete Portfolio</button>
        </form>        
      </div>
    </div>

    {#if form?.error}
      <div class="alert alert-danger text-center" role="alert">
        {form.error}
      </div>
    {/if}

    {#if form?.success}
      <div class="alert alert-success text-center" role="alert">
        {form.message || "Action completed successfully!"}
      </div>
    {/if}

    <!-- Holdings List -->
    <div class="card p-4 mb-4">
      <h2 class="text-primary">Cryptocurrencies</h2>
      <ul class="list-group">
        {#if data.portfolio.holdings?.length > 0}
          {#each data.portfolio.holdings as holding}
            <li class="list-group-item">
              <strong>Crypto ID:</strong> {holding.cryptoId} <br />
              <strong>Amount:</strong> {holding.amount} <br />
              <strong>Buy Price:</strong> {holding.buyPrice} USD
              <form method="POST" action="?/removeCrypto" class="mt-2">
                <input type="hidden" name="portfolio_id" value={data.portfolio._id} />
                <input type="hidden" name="cryptoId" value={holding.cryptoId} />
                <button type="submit" class="btn btn-warning btn-sm">Remove</button>
              </form>
            </li>
          {/each}
        {:else}
          <li class="list-group-item text-muted">No cryptocurrencies in this portfolio.</li>
        {/if}
      </ul>
    </div>

    <!-- Add Cryptocurrency -->
    <div class="card p-4 mb-4">
      <h2 class="text-primary">Add Cryptocurrency</h2>
      <form method="POST" action="?/addCrypto">
        <input type="hidden" name="portfolio_id" value="{data.portfolio._id}" />
        <div class="mb-3">
          <label for="cryptoId" class="form-label">Cryptocurrency ID</label>
          <input
            type="text"
            id="cryptoId"
            name="cryptoId"
            placeholder="Enter Cryptocurrency ID"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="buyPrice" class="form-label">Buy Price</label>
          <input
            type="number"
            id="buyPrice"
            name="buyPrice"
            placeholder="Enter Buy Price (USD)"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Crypto</button>
      </form>
    </div>
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
  }

  .exit-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .details-header h1 {
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .wallet-address-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 10px;
  }

  .wallet-address-container p {
    font-size: 1.2rem;
    color: #cccccc;
    margin: 0;
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 15px;
    font-size: 0.9rem;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }

  .btn-outline-light {
    color: #e0e0e0;
    border: 1px solid #e0e0e0;
    font-size: 0.9rem;
    padding: 5px 15px;
  }

  .btn-outline-light:hover {
    background-color: #e0e0e0;
    color: #121212;
  }

  .card {
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }

  .btn-warning {
    background-color: #ffc107;
    color: #212529;
  }

  .btn-warning:hover {
    background-color: #e0a800;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }
</style>
