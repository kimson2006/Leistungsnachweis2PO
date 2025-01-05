<script>
  let { form } = $props();
</script>

<a href="/cryptocurrencies">Back</a>
<h1>Add a Cryptocurrency</h1>
<form method="POST" action="?/create">
<div class="mb-3">
  <label for="name" class="form-label">Name</label>
  <input type="text" class="form-control" id="name" name="name" required>
</div>
<div class="mb-3">
  <label for="symbol" class="form-label">Symbol</label>
  <input type="text" class="form-control" id="symbol" name="symbol" required>
</div>
<div class="mb-3">
  <label for="year" class="form-label">Year</label>
  <input type="number" class="form-control" id="year" name="year" required>
</div>
<div class="mb-3">
  <label for="price" class="form-label">Price</label>
  <input type="number" class="form-control" id="price" name="price" step="0.01" required>
</div>
<div class="mb-3">
  <label for="marketCap" class="form-label">Market Cap</label>
  <input type="number" class="form-control" id="marketCap" name="marketCap" required>
</div>
<div class="mb-3">
  <label for="poster" class="form-label">Poster URL</label>
  <input type="text" class="form-control" id="poster" name="poster">
</div>
<div class="mb-3">
  <label for="watchlist" class="form-label">Add to Watchlist</label>
  <input type="checkbox" id="watchlist" name="watchlist" value="true">
</div>
<!-- New Input Field for Description -->
<div class="mb-3">
  <label for="description" class="form-label">Description</label>
  <textarea
    class="form-control"
    id="description"
    name="description"
    rows="4"
    placeholder="Enter a description for the cryptocurrency"
  ></textarea>
</div>
<button type="submit" class="btn btn-primary">Add Cryptocurrency</button>
</form>

{#if form?.success}
  <p>Cryptocurrency created</p>
{/if}
