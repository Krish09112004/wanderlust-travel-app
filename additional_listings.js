const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const additionalListings = [
  {
    title: "Romantic Paris Apartment",
    description: "Experience the romance of Paris in this charming apartment overlooking the Seine River. Perfect for couples!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2800,
    location: "Paris",
    country: "France",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Cozy Mumbai Heritage Home",
    description: "Stay in a beautifully restored heritage home in the heart of Mumbai. Experience authentic Indian culture.",
    image: {
      filename: "listingimage", 
      url: "https://images.unsplash.com/photo-1596176530529-78163e4f7ad7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "Mumbai",
    country: "India",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Goa Beach Shack",
    description: "Relax right on the beach in this rustic yet comfortable beach shack in North Goa. Wake up to ocean sounds!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 800,
    location: "Goa",
    country: "India",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Rajasthani Palace Stay",
    description: "Live like royalty in this converted palace in Udaipur. Magnificent architecture and royal treatment awaits.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 3500,
    location: "Udaipur",
    country: "India",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Himalayan Mountain Lodge",
    description: "Experience the majesty of the Himalayas from this cozy mountain lodge. Perfect for trekking enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Manali",
    country: "India",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Kerala Backwater Houseboat",
    description: "Cruise through the serene backwaters of Kerala in this traditional houseboat. Includes chef and crew.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Alleppey",
    country: "India",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Santorini Cliffside Villa",
    description: "Watch the world's most beautiful sunsets from this stunning cliffside villa in Santorini.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 4500,
    location: "Santorini",
    country: "Greece",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Amazon Rainforest Lodge",
    description: "Immerse yourself in nature at this eco-friendly lodge deep in the Amazon rainforest. Wildlife viewing included.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2200,
    location: "Amazon Basin",
    country: "Brazil",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Icelandic Northern Lights Cabin",
    description: "Experience the magical Northern Lights from this glass-roofed cabin in Iceland. Hot tub included!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1551524164-6cf6ac833fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 3200,
    location: "Reykjavik",
    country: "Iceland",
    owner: "65f986197f435e9eddad2590"
  },
  {
    title: "Australian Outback Station",
    description: "Experience the rugged beauty of the Australian Outback at this working cattle station. Horseback riding available.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Alice Springs",
    country: "Australia",
    owner: "65f986197f435e9eddad2590"
  }
];

async function main() {
  await mongoose.connect(MONGO_URL);
}

const addListings = async () => {
  await Listing.insertMany(additionalListings);
  console.log("Additional listings added successfully!");
  mongoose.connection.close();
};

main()
  .then(() => {
    console.log("Connected to DB");
    addListings();
  })
  .catch((err) => {
    console.log(err);
  });
