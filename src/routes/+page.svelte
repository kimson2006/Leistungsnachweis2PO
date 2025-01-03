<script>
  // You can add interactivity here if needed
</script>

<style>
  /* Basic styles for the entire body */

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
  }

  h1 {
    font-size: 3.5rem;
    color: #1E90FF; /* Blue for the main heading */
    margin-bottom: 20px;
  }

  p {
    font-size: 1.4rem;
    color: #dcdcdc; /* Light gray for the text */
    margin-bottom: 40px;
  }

  .link-list {
    display: flex;
    justify-content: space-around;
    gap: 30px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .link-item {
    background-color: #1E90FF; /* Blue for the buttons */
    color: white;
    text-decoration: none;
    padding: 20px 30px;
    border-radius: 8px;
    font-size: 1.2rem;
    transition: background-color 0.3s ease, transform 0.3s ease;
    width: 250px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .link-item:hover {
    background-color: #4682B4; /* Darker blue for the hover effect */
    transform: translateY(-5px);
  }

  .image-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    gap: 20px;
    flex-wrap: wrap;
  }

  .image-section img {
    width: 48%;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }

  .image-section img:hover {
    transform: scale(1.05);
  }

  .image-section .text {
    width: 48%;
    text-align: left;
    padding: 25px;
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .image-section .text h2 {
    font-size: 2.5rem;
    color: #1E90FF; /* Blue for the heading */
    margin-bottom: 20px;
  }

  .image-section .text p {
    font-size: 1.1rem;
    color: #ddd;
    line-height: 1.6;
  }

  .cta-button {
    background-color: #1E90FF;
    color: white;
    font-size: 1.4rem;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    margin-top: 40px;
    display: inline-block;
    transition: background-color 0.3s ease;
  }

  .cta-button:hover {
    background-color: #4682B4; /* Darker blue for the hover effect */
  }
</style>

<div class="container">
  <h1>Welcome to the World of Cryptocurrencies!</h1>
  <p>Explore the latest information and trends about cryptocurrencies and stay up to date.</p>

  <div class="link-list">
    <a href="/cryptocurrencies" class="link-item">
      View All Cryptocurrencies
    </a>
    <a href="/cryptocurrencies/create" class="link-item">
      Add a Cryptocurrency
    </a>
    <a href="/portfolio" class="link-item">
      View Portfolio
    </a>
    <a href="/portfolio/create" class="link-item">
      Create a Portfolio
    </a>
  </div>

  <div class="image-section">
    <div class="text">
      <h2>What Are Cryptocurrencies?</h2>
      <p>Cryptocurrencies are digital currencies based on blockchain technology. They offer a decentralized way to perform transactions without the need for banks or central authorities. Discover how this innovative technology is revolutionizing the financial world!</p>
      <a href="/cryptocurrencies" class="cta-button">Learn More</a>
    </div>
    <img src="/images/cryptocurrency-banner.png" alt="Cryptocurrencies" />
  </div>
</div>
