<script>
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
  
    let handleRedirect;
    export let form = {}; // For handling success or error messages from the backend
  
    // Initialize enhance inside onMount to avoid SSR issues
    onMount(() => {
      handleRedirect = enhance((form) => ({
        afterSubmit: ({ result }) => {
          console.log("Form submission result:", result); // Debugging log
          if (result.type === "success" && result.redirect) {
            console.log("Redirecting to:", result.redirect); // Log redirect URL
            window.location.href = result.redirect; // Redirect to addCrypto page
          } else {
            console.log("Form submission result:", result); // Log any other result
          }
        },
      }));
    });
  </script>
  
  <main class="container mt-5" use:handleRedirect>
    <h1 class="text-primary mb-4">Create a New Portfolio</h1>
  
    <!-- Success Message -->
    {#if form?.success}
      <div class="alert alert-success">
        {form.message || "Portfolio created successfully!"}
      </div>
      <a href="/portfolio" class="btn btn-secondary mt-3">Back to Portfolio</a>
    {/if}
  
    <!-- Error Message -->
    {#if form?.error}
      <div class="alert alert-danger">{form.error}</div>
    {/if}
  
    <form method="POST" action="?/create">
      <div class="mb-3">
        <label for="name" class="form-label">Portfolio Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          placeholder="Enter portfolio name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="walletAddress" class="form-label">Wallet Address</label>
        <input
          type="text"
          class="form-control"
          id="walletAddress"
          name="walletAddress"
          placeholder="Enter wallet address"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Create Portfolio</button>
    </form>
  </main>
  
  <style>
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: #1e1e1e;
      border-radius: 10px;
      color: #e0e0e0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
  
    .form-label {
      font-weight: bold;
    }
  
    .btn-primary {
      background-color: #007bff;
      color: white;
      border: none;
      font-size: 1rem;
      padding: 10px 20px;
    }
  
    .btn-primary:hover {
      background-color: #0056b3;
    }
  
    .btn-secondary {
      background-color: #6c757d;
      color: white;
      border: none;
      font-size: 1rem;
      padding: 10px 20px;
      text-decoration: none;
    }
  
    .btn-secondary:hover {
      background-color: #5a6268;
    }
  
    .alert {
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
    }
  
    .alert-danger {
      background-color: #f8d7da;
      color: #721c24;
    }
  
    .alert-success {
      background-color: #d4edda;
      color: #155724;
    }
  </style>
  