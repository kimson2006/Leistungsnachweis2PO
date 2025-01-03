<script>
    import CryptocurrenciesCard from "$lib/components/CryptocurrenciesCard.svelte";
  
    let { data, filterByWatchlist = false } = $props();
  
    // Dynamisches Filtern der Kryptowährungen basierend auf der Watchlist
    let cryptocurrencies = $derived.by(() => {
      if (filterByWatchlist) {
        // Nur Kryptowährungen in der Watchlist anzeigen
        let filteredCryptos = data.cryptos.filter((crypto) => crypto.watchlist);
        return filteredCryptos;
      }
      // Alle Kryptowährungen anzeigen
      return data.cryptos;
    });
  </script>
  
  <p><i>Data and images generated with ChatGPT</i></p>
  <div>
    <a href="/cryptocurrencies/create" class="btn btn-primary">Add New Cryptocurrency</a>
  </div>
  
  <!-- Checkbox für den Watchlist-Filter -->
  <div class="form-check mt-3">
    <input
      class="form-check-input"
      type="checkbox"
      id="filter"
      bind:checked={filterByWatchlist}
    />
    <label class="form-check-label" for="filter">
      Show only cryptocurrencies on watchlist
    </label>
  </div>
  
  <!-- Liste der Kryptowährungen -->
  <div class="crypto-list mt-3">
    {#each cryptocurrencies as crypto}
      <CryptocurrenciesCard {crypto} person={data.person}></CryptocurrenciesCard>
    {/each}
  </div>
  
  <style>
    .crypto-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  </style>
  