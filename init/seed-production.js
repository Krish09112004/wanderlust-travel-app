const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Use production database URL from environment variables
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to production database");
    return initDB();
  })
  .then(() => {
    console.log("Data seeding completed successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error:", err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  console.log("Checking existing data...");
  
  // Check if data already exists
  const existingCount = await Listing.countDocuments({});
  console.log(`Found ${existingCount} existing listings`);
  
  if (existingCount === 0) {
    console.log("No existing data found. Seeding with sample data...");
    
    // Add a default owner ID for all listings (you can change this to a real user ID)
    const defaultOwnerId = "65f986197f435e9eddad2590"; // You can update this with a real user ID
    
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: defaultOwnerId
    }));
    
    await Listing.insertMany(initData.data);
    console.log(`Successfully inserted ${initData.data.length} sample listings`);
  } else {
    console.log("Data already exists. Skipping seeding.");
  }
};
