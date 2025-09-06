const mongoose = require("mongoose");
const User = require("./models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

const createTestUsers = async () => {
  try {
    console.log("🔧 Creating test users for demonstration...\n");
    
    // Check if test users already exist
    const existingTestUser = await User.findOne({ username: "testuser" });
    
    if (existingTestUser) {
      console.log("ℹ️  Test user already exists, skipping creation.\n");
    } else {
      // Create test users
      const testUsers = [
        {
          email: "test@example.com",
          username: "testuser"
        },
        {
          email: "demo@wanderlust.com", 
          username: "demouser"
        },
        {
          email: "admin@wanderlust.com",
          username: "admin"
        }
      ];

      for (let userData of testUsers) {
        const user = new User({
          email: userData.email,
          username: userData.username
        });
        
        // Register with a simple password
        await User.register(user, "password123");
        console.log(`✅ Created user: ${userData.username} (${userData.email})`);
      }
    }

    // Display all users
    console.log("\n📋 ALL USERS IN DATABASE:");
    console.log("=" .repeat(50));
    
    const allUsers = await User.find({});
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. 👤 Username: ${user.username}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔑 Login with: Username/Email + Password`);
      console.log(`   📅 Created: ${user._id.getTimestamp()}`);
      console.log("-" .repeat(30));
    });

    console.log("\n🔐 LOGIN CREDENTIALS FOR TESTING:");
    console.log("================================");
    console.log("📝 For any of the above users, you can login with:");
    console.log("   Username: [any username shown above]");
    console.log("   Password: password123 (for test users)");
    console.log("   OR the original password if you know it");
    
    console.log("\n🌐 HOW TO LOGIN:");
    console.log("================");
    console.log("1. Go to: http://localhost:8080/login");
    console.log("2. Enter username and password");
    console.log("3. Click 'Login'");
    
    console.log("\n💡 TIPS:");
    console.log("========");
    console.log("• Passwords are always hashed for security");
    console.log("• You can create new users at: http://localhost:8080/signup");
    console.log("• Logged in users can create new listings");
    console.log("• Only listing owners can edit/delete their listings");

  } catch (error) {
    if (error.name === 'UserExistsError') {
      console.log("ℹ️  Some test users already exist, that's okay!");
    } else {
      console.error("❌ Error creating users:", error.message);
    }
  } finally {
    mongoose.connection.close();
  }
};

main()
  .then(() => {
    console.log("🔗 Connected to database");
    createTestUsers();
  })
  .catch((err) => {
    console.log("❌ Database connection error:", err.message);
  });
