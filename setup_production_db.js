const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");
const initData = require("./init/data.js");

// Use environment variable for production DB or fallback to local
const MONGO_URL = process.env.ATLASDB_URL || process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/wanderlust";

console.log("🔗 Connecting to database...");
console.log(`📍 Database URL: ${MONGO_URL.replace(/\/\/[^@]*@/, '//***:***@')}`);

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to database successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

const setupProductionDatabase = async () => {
  try {
    console.log("\n🚀 Setting up production database...\n");

    // Check if listings already exist
    const existingListings = await Listing.countDocuments();
    console.log(`📊 Current listings in database: ${existingListings}`);

    if (existingListings > 0) {
      console.log("ℹ️  Database already has listings. Skipping data initialization.");
      console.log("💡 To reset database, manually delete collections and run this script again.");
    } else {
      console.log("📝 Initializing database with sample data...");
      
      // Create default user for listings
      let defaultUser;
      try {
        const existingUser = await User.findOne({ username: "wanderlust-admin" });
        if (existingUser) {
          defaultUser = existingUser;
          console.log("👤 Using existing admin user");
        } else {
          const adminUser = new User({
            email: "admin@wanderlust.com",
            username: "wanderlust-admin"
          });
          
          defaultUser = await User.register(adminUser, "wanderlust2024!");
          console.log("✅ Created admin user: wanderlust-admin");
        }
      } catch (error) {
        console.error("❌ Error creating admin user:", error.message);
        return;
      }

      // Add owner to all listings
      const listingsWithOwner = initData.data.map((listing) => ({
        ...listing,
        owner: defaultUser._id,
      }));

      // Insert listings
      await Listing.insertMany(listingsWithOwner);
      console.log(`✅ Added ${listingsWithOwner.length} listings to database`);

      // Create additional test user
      try {
        const testUser = new User({
          email: "test@wanderlust.com",
          username: "testuser"
        });
        await User.register(testUser, "password123");
        console.log("✅ Created test user: testuser");
      } catch (error) {
        if (error.name !== 'UserExistsError') {
          console.log("ℹ️  Test user already exists");
        }
      }
    }

    // Display summary
    const finalListingCount = await Listing.countDocuments();
    const userCount = await User.countDocuments();

    console.log("\n📈 DATABASE SUMMARY:");
    console.log("=".repeat(30));
    console.log(`📋 Total Listings: ${finalListingCount}`);
    console.log(`👥 Total Users: ${userCount}`);

    console.log("\n🔐 LOGIN CREDENTIALS:");
    console.log("=".repeat(30));
    console.log("Admin User:");
    console.log("  Username: wanderlust-admin");
    console.log("  Password: wanderlust2024!");
    console.log("");
    console.log("Test User:");
    console.log("  Username: testuser");
    console.log("  Password: password123");

    console.log("\n🎉 Production database setup complete!");
    console.log("🌐 Your app is ready to deploy!");

  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
};

// Check if this script is being run directly
if (require.main === module) {
  main()
    .then(() => {
      setupProductionDatabase();
    })
    .catch((err) => {
      console.error("❌ Script execution failed:", err.message);
      process.exit(1);
    });
}

module.exports = { setupProductionDatabase };
