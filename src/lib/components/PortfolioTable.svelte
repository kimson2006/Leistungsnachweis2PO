<script>
  export let portfolios = []; // Data passed to the table component
</script>

<main class="container mt-5">
  <h1 class="display-4 text-center">Portfolio Übersicht</h1>

  <table class="table table-striped table-hover align-middle mt-4">
    <thead class="bg-dark text-white">
      <tr>
        <th>Name</th>
        <th>Wallet Address</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {#each portfolios as portfolio}
        <tr>
          <td class="fw-bold">{portfolio.name}</td>
          <td class="text-monospace">{portfolio.walletAddress}</td>
          <td>
            <a href={`/portfolio/${portfolio._id}`} class="btn btn-primary btn-sm">
              View Details
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
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

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  thead {
    background-color: #343a40;
    color: white;
  }

  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }

  a.btn {
    text-transform: uppercase;
    font-size: 0.9rem;
  }
</style>
