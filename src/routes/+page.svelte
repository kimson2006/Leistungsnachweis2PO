<script>
  // You can add interactivity here if needed
</script>

<style>
  /* Grundlegender Stil für den gesamten Body */

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
  }

  h1 {
    font-size: 3.5rem;
    color: #1E90FF; /* Blau für die Hauptüberschrift */
    margin-bottom: 20px;
  }

  p {
    font-size: 1.4rem;
    color: #dcdcdc; /* Helles Grau für den Text */
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
    background-color: #1E90FF; /* Blau für die Schaltflächen */
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
    background-color: #4682B4; /* Dunkleres Blau für den Hover-Effekt */
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
    color: #1E90FF; /* Blau für die Überschrift */
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
    background-color: #4682B4; /* Dunkleres Blau für den Hover-Effekt */
  }
</style>

<div class="container">
  <h1>Willkommen in der Welt der Kryptowährungen!</h1>
  <p>Erkunde die neuesten Informationen und Trends zu Kryptowährungen und bleibe immer auf dem Laufenden.</p>

  <div class="link-list">
    <a href="/cryptocurrencies" class="link-item">
      Alle Kryptowährungen anschauen
    </a>
    <a href="/cryptocurrencies/create" class="link-item">
      Kryptowährungen hinzufügen
    </a>
    <a href="/portfolio" class="link-item">
      Portfolio anschauen
    </a>
    <a href="/portfolio/create" class="link-item">
      Portfolio erstellen
    </a>
  </div>

  <div class="image-section">
    <div class="text">
      <h2>Was sind Kryptowährungen?</h2>
      <p>Kryptowährungen sind digitale Währungen, die auf der Blockchain-Technologie basieren. Sie bieten eine dezentrale Möglichkeit zur Durchführung von Transaktionen ohne die Notwendigkeit von Banken oder zentralen Instanzen. Entdecke, wie diese innovative Technologie die Finanzwelt revolutioniert!</p>
      <a href="/cryptocurrencies" class="cta-button">Mehr erfahren</a>
    </div>
    <img src="/images/cryptocurrency-banner.png" alt="Kryptowährungen" />
  </div>
</div>
