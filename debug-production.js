const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

// Use the same database URL as the main app
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

console.log("=== WanderLust Production Debug ===");
console.log("Database URL:", dbUrl ? "✅ Set" : "❌ Not Set");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");

async function main() {
  try {
    console.log("\n1. Connecting to database...");
    await mongoose.connect(dbUrl);
    console.log("✅ Database connected successfully");
    
    console.log("\n2. Counting total listings...");
    const totalCount = await Listing.countDocuments({});
    console.log(`✅ Total listings in database: ${totalCount}`);
    
    if (totalCount > 0) {
      console.log("\n3. Fetching first 3 listings...");
      const sampleListings = await Listing.find({}).limit(3);
      
      sampleListings.forEach((listing, index) => {
        console.log(`\nListing ${index + 1}:`);
        console.log(`  - ID: ${listing._id}`);
        console.log(`  - Title: ${listing.title}`);
        console.log(`  - Location: ${listing.location}`);
        console.log(`  - Price: ${listing.price}`);
        console.log(`  - Image URL: ${listing.image?.url ? '✅ Present' : '❌ Missing'}`);
        console.log(`  - Owner: ${listing.owner ? '✅ Present' : '❌ Missing'}`);
      });
      
      console.log("\n4. Testing the controller logic...");
      // Simulate what the controller does
      const allListings = await Listing.find({});
      console.log(`✅ Controller would receive ${allListings.length} listings`);
      
      // Check if any listings have missing required fields
      let invalidListings = 0;
      allListings.forEach(listing => {
        if (!listing.title || !listing.image || !listing.image.url) {
          invalidListings++;
        }
      });
      
      if (invalidListings > 0) {
        console.log(`⚠️  Warning: ${invalidListings} listings have missing required fields`);
      } else {
        console.log("✅ All listings have required fields");
      }
      
    } else {
      console.log("❌ No listings found in database");
    }
    
  } catch (error) {
    console.log("❌ Error occurred:");
    console.log(error.message);
  } finally {
    console.log("\n=== Debug Complete ===");
    process.exit(0);
  }
}

main();
