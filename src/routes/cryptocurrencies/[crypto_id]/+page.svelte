<script>
  export let data;

  if (!data || !data.crypto) {
    console.error("Kryptowährung nicht gefunden!");
    throw new Error("Keine Daten für diese Kryptowährung verfügbar.");
  }
</script>

<a href="/cryptocurrencies" class="btn btn-secondary">Zurück</a>
<h1>{data.crypto.name} ({data.crypto.symbol})</h1>

<div class="crypto-detail">
  <img
    class="poster"
    src={`/images/${data.crypto.symbol.toUpperCase()}.png`}
    alt={data.crypto.name}
    onerror={(event) => (event.target.src = "/images/default.png")}
  />
  <div class="details">
    <p><strong>Preis:</strong> ${data.crypto.price?.toFixed(2) ?? "N/A"}</p>
    <p><strong>Marktkapitalisierung:</strong> ${data.crypto.marketCap?.toLocaleString()} USD</p>
    <p><strong>Änderung (24h):</strong> {data.crypto.percentChange24h ?? "N/A"}%</p>
    <p><strong>Beschreibung:</strong> {data.crypto.description ?? "Keine Beschreibung verfügbar."}</p>
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={data.crypto._id}>
      <button class="btn btn-danger">Kryptowährung löschen</button>
    </form>
  </div>
</div>

<style>
  .crypto-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 20px auto;
    max-width: 600px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .poster {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .details {
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
  }

  .details p {
    margin: 10px 0;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .btn:hover {
    background-color: #0056b3;
  }
</style>
