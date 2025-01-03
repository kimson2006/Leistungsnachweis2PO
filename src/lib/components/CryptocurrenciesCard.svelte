<script>
  export let crypto;

  async function toggleWatchlist() {
    const url = crypto.watchlist ? "/removeFromWatchlist" : "/addToWatchlist";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: crypto._id }),
      });

      if (response.ok) {
        // Toggle status locally based on successful request
        crypto.watchlist = !crypto.watchlist;
      } else {
        console.error("Error in request:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  }
</script>

<div class="crypto-card">
  <div class="details">
    <img
      class="crypto-poster"
      src={`/images/${crypto.symbol.toUpperCase()}.png`}
      alt={crypto.name}
      onerror={(e) => (e.target.src = "/images/default.png")}
    />
    <!-- Name as link to the detail view -->
    <h3>
      <a href={`/cryptocurrencies/${crypto._id}`}>{crypto.name} ({crypto.symbol})</a>
    </h3>
    <p>Price: ${crypto.price?.toFixed(2) ?? 'N/A'}</p>
    <p>Market Cap: ${crypto.marketCap?.toLocaleString() ?? 'N/A'} USD</p>
    <p>Year: {crypto.year}</p>
  </div>

  <div class="actions">
    <button
      class={crypto.watchlist ? "btn btn-danger" : "btn btn-success"}
      onclick={toggleWatchlist}
    >
      {crypto.watchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  </div>
</div>


<style>
  .crypto-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .details {
    text-align: center;
  }

  .crypto-poster {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 16px;
  }

  .actions {
    margin-top: 16px;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
  }

  .btn-success {
    background-color: #28a745;
    color: white;
  }
</style>
