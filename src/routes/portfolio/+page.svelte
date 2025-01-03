<script>
  export let data;
</script>

<main class="container mt-5">
  <div class="portfolio-header text-center mb-4">
    <h1 class="display-4 text-white">📊 Portfolio Overview</h1>
    <p class="text-light">Manage your cryptocurrency portfolios with ease</p>
  </div>

  <!-- Create Portfolio Button -->
  <div class="text-end mb-4">
    <a href="/portfolio/create" class="btn btn-success">+ Create Portfolio</a>
  </div>

  <table class="table table-striped table-hover table-bordered text-center align-middle">
    <thead class="bg-dark text-white">
      <tr>
        <th scope="col"><i class="bi bi-link"></i> Name</th>
        <th scope="col"><i class="bi bi-wallet2"></i> Wallet-Adresse</th>
        <th scope="col"><i class="bi bi-tools"></i> Details</th>
      </tr>
    </thead>
    <tbody>
      {#each data.portfolios as portfolio}
        <tr>
          <td class="fw-bold">{portfolio.name}</td>
          <td class="text-monospace">{portfolio.walletAddress}</td>
          <td>
            <a href={`/portfolio/${portfolio._id}`} class="btn btn-primary btn-sm text-uppercase">
              Details Anzeigen
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Arial', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1; /* Make the main content fill the available space */
    padding: 20px;
  }

  .portfolio-header h1 {
    color: #ffffff;
    font-weight: bold;
  }

  .portfolio-header p {
    font-size: 1rem;
    color: #cccccc;
  }

  .btn-success {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 8px 16px;
    color: #ffffff;
    border: none;
    background-color: #28a745;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn-success:hover {
    background-color: #218838;
  }

  table {
    background-color: #ffffff;
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }

  thead {
    background-color: #f9f9f9; /* Light gray background */
  }

  th {
    color: #000000; /* Black text for headers */
    padding: 10px;
    font-size: 1rem;
    text-transform: uppercase;
    border: 1px solid #ddd;
  }

  td {
    font-size: 0.95rem;
    padding: 15px;
    color: #333333;
    border: 1px solid #ddd;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  a.btn {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #ffffff;
    background-color: #007bff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  a.btn:hover {
    background-color: #0056b3;
  }

  .text-monospace {
    font-family: 'Courier New', Courier, monospace;
    color: #333333;
  }

  .fw-bold {
    font-weight: bold;
    color: #121212;
  }
</style>
