# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

WanderLust is a full-stack travel listings web application built with Node.js, Express.js, and MongoDB. It's an Airbnb-like platform where users can view, create, edit, and review property listings.

## Technology Stack

- **Backend**: Node.js v16.16.0, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **Template Engine**: EJS with EJS-Mate
- **File Upload**: Multer with Cloudinary integration
- **Validation**: Joi for server-side validation
- **Session Management**: Express-Session with MongoDB store
- **Flash Messages**: Connect-Flash

## Architecture

The application follows the **MVC (Model-View-Controller)** pattern:

### Directory Structure
```
├── models/           # MongoDB schemas and models
│   ├── listing.js    # Property listing model
│   ├── review.js     # Review model
│   └── user.js       # User model with Passport integration
├── views/            # EJS templates
│   ├── layouts/      # Layout templates (boilerplate.ejs)
│   ├── listings/     # Listing-related views (index, show, new, edit)
│   ├── users/        # Authentication views
│   └── includes/     # Reusable components (navbar, footer, flash)
├── controller/       # Route handlers and business logic
│   ├── listings.js   # CRUD operations for listings
│   ├── reviews.js    # Review management
│   └── users.js      # Authentication logic
├── routes/           # Express route definitions
│   ├── listing.js    # Listing routes with middleware
│   ├── review.js     # Review routes
│   └── user.js       # Authentication routes
├── public/           # Static assets (CSS, JS, images)
├── utils/            # Utility functions
│   ├── expressError.js  # Custom error handling
│   └── wrapAsync.js     # Async wrapper for route handlers
└── init/             # Database initialization and seed data
```

### Key Components

**Models**:
- `Listing`: Property listings with image, price, location, owner reference
- `Review`: User reviews with rating and comments, linked to listings and authors
- `User`: Authentication model using passport-local-mongoose plugin

**Authentication Flow**:
- Local username/password authentication via Passport.js
- Session-based authentication with MongoDB session store
- Middleware protection for authenticated routes (`isLoggedin`)
- Ownership verification (`isOwner`, `isAuthor`) for CRUD operations

**Image Management**:
- Cloudinary integration for image storage and transformation
- Multer middleware for handling file uploads
- Image URL transformation for thumbnails and optimization

**Data Validation**:
- Server-side validation using Joi schemas (`schema.js`)
- Client-side validation with Bootstrap validation classes
- Custom middleware for request validation

**Error Handling**:
- Custom error class (`ExpressError`)
- Centralized error handling middleware
- Flash messages for user feedback

## Development Commands

### Start the Application
```bash
node app.js
```
The server runs on port 8080 by default.

### Environment Setup
Create a `.env` file in the root directory with:
```
ATLASDB_URL=mongodb://your-mongodb-connection-string
SECRET=your-session-secret
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

### Database Initialization
```bash
node init/index.js
```
This seeds the database with sample data from `init/data.js`.

### MongoDB Connection
The app connects to MongoDB Atlas using the `ATLASDB_URL` environment variable. Ensure your MongoDB cluster is accessible and the connection string is correct.

## Route Structure

- `GET /` → Redirects to `/listings`
- `GET /listings` → Show all listings (index)
- `GET /listings/new` → New listing form (requires authentication)
- `POST /listings` → Create new listing (requires authentication)
- `GET /listings/:id` → Show specific listing with reviews
- `GET /listings/:id/edit` → Edit listing form (requires ownership)
- `PUT /listings/:id` → Update listing (requires ownership)
- `DELETE /listings/:id` → Delete listing (requires ownership)
- `POST /listings/:id/reviews` → Create review (requires authentication)
- `DELETE /listings/:id/reviews/:reviewId` → Delete review (requires authorship)
- `GET/POST /signup` → User registration
- `GET/POST /login` → User authentication
- `GET /logout` → User logout

## Middleware Chain

1. **Authentication**: `isLoggedin` - Verifies user session
2. **Authorization**: `isOwner`, `isAuthor` - Verifies ownership/authorship
3. **Validation**: `validateListing`, `validatereview` - Joi schema validation
4. **File Upload**: `upload.single('listing[image]')` - Multer file handling
5. **Error Handling**: `wrapAsync` - Catches async errors

## Database Relationships

- **User** → **Listing** (one-to-many): Users can own multiple listings
- **Listing** → **Review** (one-to-many): Listings can have multiple reviews
- **User** → **Review** (one-to-many): Users can write multiple reviews
- Post-middleware handles cascading deletes (deleting a listing removes its reviews)

## Key Features

- **CRUD Operations**: Full create, read, update, delete functionality for listings
- **User Authentication**: Secure login/logout with session management
- **Authorization**: Owner-only editing/deletion of listings and reviews
- **Image Upload**: Cloudinary integration with image transformation
- **Reviews System**: Star ratings and comments for listings
- **Flash Messages**: User feedback for actions and errors
- **Responsive Design**: Bootstrap-based UI with custom CSS
- **Input Validation**: Both client-side and server-side validation
- **Error Handling**: Comprehensive error management with custom error pages
