import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
let db;

// Function to connect to the database
export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("cryptocurrency"); // Replace with your database name
  }
  return db;
}

// Ensure the database is connected before any operation
async function ensureDbConnection() {
  if (!db) {
    await connectToDatabase();
  }
}

// Export the connection for use in other files
export { db };

//////////////////////////////////////////
// Cryptocurrencies
//////////////////////////////////////////

// Get all cryptocurrencies
async function getCryptos() {
  let cryptos = [];
  try {
    await ensureDbConnection(); // Ensure DB connection
    const collection = db.collection("cryptocurrencies");

    // Query all cryptocurrencies
    const query = {};
    cryptos = await collection.find(query).toArray();

    // Convert ObjectId to string for frontend compatibility
    cryptos.forEach((crypto) => {
      crypto._id = crypto._id.toString();
    });
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
  }
  return cryptos;
}

// Get cryptocurrency by id
import { ObjectId } from "mongodb";

export async function getCrypto(id) {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");

  try {
    const objectId = new ObjectId(id); // Konvertiere die ID in ein ObjectId
    const crypto = await collection.findOne({ _id: objectId });

    if (!crypto) {
      console.error(`Kryptowährung mit ID ${id} nicht gefunden.`);
      return null;
    }

    return crypto;
  } catch (error) {
    console.error("Fehler beim Abrufen der Kryptowährung:", error);
    throw error;
  }
}

// Create cryptocurrency
async function createCrypto(crypto) {
  try {
    await ensureDbConnection(); // Ensure DB connection
    const collection = db.collection("cryptocurrencies");
    const result = await collection.insertOne(crypto);

    return result.insertedId.toString(); // Return the created ObjectId as string
  } catch (error) {
    console.error("Error creating cryptocurrency:", error);
    return null;
  }
}

// Update cryptocurrency
async function updateCrypto(crypto) {
  try {
    await ensureDbConnection();
    const collection = db.collection("cryptocurrencies");

    // Convert string ID to ObjectId
    const query = { _id: new ObjectId(crypto._id) };
    const update = { $set: { watchlist: crypto.watchlist } };

    const result = await collection.updateOne(query, update);

    if (result.matchedCount === 0) {
      throw new Error(`Cryptocurrency with ID ${crypto._id} not found`);
    }
    return result;
  } catch (error) {
    console.error("Error updating cryptocurrency:", error);
    throw error;
  }
}

export async function updateCryptoStatus(id, status) {
  await ensureDbConnection();
  const collection = db.collection("cryptocurrencies");

  const query = { _id: new ObjectId(id) };
  const update = { $set: { watchlist: status } };

  const result = await collection.updateOne(query, update);

  if (result.matchedCount === 0) {
    throw new Error(`Keine Kryptowährung mit ID ${id} gefunden`);
  }
  return result;
}


// Delete cryptocurrency by id
async function deleteCrypto(id) {
  try {
    await ensureDbConnection();
    const collection = db.collection("cryptocurrencies");

    // Convert string ID to ObjectId
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.error(`No cryptocurrency found with ID ${id}`);
      return null;
    }
    console.log(`Cryptocurrency with ID ${id} deleted successfully`);
    return id;
  } catch (error) {
    console.error("Error deleting cryptocurrency:", error);
    return null;
  }
}

//////////////////////////////////////////
// Persons and Portfolio
//////////////////////////////////////////

export async function getPortfolios() {
  const db = await connectToDatabase();
  const collection = db.collection("portfolio");

  const portfolios = await collection.aggregate([
    {
      $lookup: {
        from: "cryptocurrencies",
        localField: "portfolio.cryptoId",
        foreignField: "_id",
        as: "cryptoDetails",
      },
    },
  ]).toArray();

  return portfolios.map((portfolio) => ({
    _id: portfolio._id.toString(), // Konvertiere nur hier
    name: portfolio.name || "No Name",
    walletAddress: portfolio.walletAddress || "No Address",
    portfolio: portfolio.portfolio.map((entry) => ({
      ...entry,
      cryptoId: entry.cryptoId?.toString(),
    })),
    cryptoDetails: portfolio.cryptoDetails.map((crypto) => ({
      ...crypto,
      _id: crypto._id.toString(),
    })),
  }));
}




export async function getPersonWithDetails(personId) {
  const db = await connectToDatabase();
  const collection = db.collection("portfolio");

  if (!ObjectId.isValid(personId)) {
    throw new Error("Invalid person ID");
  }

  const person = await collection.aggregate([
    { $match: { _id: new ObjectId(personId) } },
    {
      $lookup: {
        from: "cryptocurrencies",
        localField: "portfolio.cryptoId",
        foreignField: "_id",
        as: "cryptoDetails",
      },
    },
  ]).toArray();

  return person[0] || null;
}


// Funktion: Person erstellen
export async function createPerson(person) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");

  try {
    // Convert `cryptoId` fields in the portfolio to `ObjectId`
    person.portfolio = person.portfolio.map((crypto) => ({
      ...crypto,
      cryptoId: new ObjectId(crypto.cryptoId),
    }));

    const result = await collection.insertOne(person);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating person:", error);
    throw error;
  }
}

import { connectToDatabase } from "$lib/db.js";

export async function createPortfolio(portfolio) {
  const db = await connectToDatabase();
  const collection = db.collection("portfolio");

  try {
    const result = await collection.insertOne({
      name: portfolio.name,
      walletAddress: portfolio.walletAddress,
      holdings: [], // Initialize holdings as an empty array
      createdAt: new Date(),
    });
    console.log("Inserted Portfolio ID:", result.insertedId.toString());
    return result.insertedId.toString(); // Return the inserted ID
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
}


// Funktion: Kryptowährung zum Portfolio einer Person hinzufügen
export async function addCryptoToPortfolio(personId, portfolioEntry) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");

  try {
    // Ensure `cryptoId` is an ObjectId
    portfolioEntry.cryptoId = new ObjectId(portfolioEntry.cryptoId);

    const query = { _id: new ObjectId(personId) };
    const update = { $push: { portfolio: portfolioEntry } };

    const result = await collection.updateOne(query, update);

    console.log("addCryptoToPortfolio Result:", result);

    if (result.matchedCount === 0) {
      throw new Error(`Person with ID ${personId} not found`);
    }
    return result;
  } catch (error) {
    console.error("Error in addCryptoToPortfolio:", error.message);
    throw error;
  }
}

// Funktion: Kryptowährung aus dem Portfolio einer Person entfernen
export async function removeCryptoFromPortfolio(personId, cryptoId) {
  await ensureDbConnection();
  const collection = db.collection("portfolio");

  try {
    const query = { _id: new ObjectId(personId) };
    const update = { $pull: { portfolio: { cryptoId: new ObjectId(cryptoId) } } };
    const result = await collection.updateOne(query, update);

    if (result.matchedCount === 0) {
      throw new Error(`Person with ID ${personId} not found`);
    }
    return result;
  } catch (error) {
    console.error("Error removing crypto from portfolio:", error);
    throw error;
  }
}


// Export functions for use in other parts of the app
export default {
  getCryptos,
  getCrypto,
  createCrypto,
  updateCrypto,
  updateCryptoStatus,
  deleteCrypto,
  getPortfolios,
  getPersonWithDetails,
  createPerson,
  createPortfolio,
  addCryptoToPortfolio,
  removeCryptoFromPortfolio
};
