const mongoose = require("mongoose");
const User = require("./models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

const viewUsers = async () => {
  try {
    console.log("🔍 Fetching all users from database...\n");
    
    const users = await User.find({});
    
    if (users.length === 0) {
      console.log("❌ No users found in the database.");
      console.log("💡 Users will be created when someone signs up through the application.");
    } else {
      console.log(`✅ Found ${users.length} user(s) in the database:\n`);
      console.log("=" .repeat(60));
      
      users.forEach((user, index) => {
        console.log(`👤 User #${index + 1}:`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   🏷️  Username: ${user.username}`);
        console.log(`   🆔 User ID: ${user._id}`);
        console.log(`   🔐 Password: [HASHED - Cannot display for security]`);
        console.log(`   📅 Created: ${user._id ? user._id.getTimestamp() : 'Unknown'}`);
        console.log("-".repeat(40));
      });
      
      console.log("\n📋 SUMMARY:");
      console.log(`Total users: ${users.length}`);
      console.log(`Usernames: ${users.map(u => u.username).join(", ")}`);
      
      console.log("\n🔐 SECURITY NOTE:");
      console.log("Passwords are hashed using salt and cannot be displayed in plain text.");
      console.log("This is a security feature to protect user data.");
    }
    
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

main()
  .then(() => {
    console.log("🔗 Connected to database");
    viewUsers();
  })
  .catch((err) => {
    console.log("❌ Database connection error:", err.message);
  });
