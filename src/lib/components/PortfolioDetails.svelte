<script>
    export let portfolio = {};
  </script>
  
  <main class="container mt-5">
    <h1 class="display-4 text-center">Portfolio Details</h1>
    <p class="text-center">Wallet Address: {portfolio.walletAddress}</p>
  
    <div class="card p-4 mt-4">
      <h2>Kryptowährungen</h2>
      <ul>
        {#each portfolio.holdings as holding}
          <li>
            <strong>Crypto ID:</strong> {holding.cryptoId}, 
            <strong>Amount:</strong> {holding.amount}, 
            <strong>Buy Price:</strong> {holding.buyPrice} USD
          </li>
        {/each}
      </ul>
    </div>
  
    <div class="text-center mt-4">
      <a href="/portfolio" class="btn btn-secondary">Back to Overview</a>
    </div>
  </main>
  
  <style>
    .container {
      max-width: 800px;
      margin: auto;
    }
  
    h1 {
      font-family: 'Arial', sans-serif;
      color: #343a40;
      font-weight: bold;
    }
  
    .card {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    ul {
      padding: 0;
      list-style: none;
    }
  
    ul li {
      padding: 8px 0;
      font-size: 1rem;
    }
  
    .btn {
      font-size: 1rem;
      padding: 10px 20px;
      text-transform: uppercase;
    }
  </style>
  