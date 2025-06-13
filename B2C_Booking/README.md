    # 🧳 B2C Booking API Backend

    A secure and scalable backend-only B2C Booking API built using **Next.js API routes**, **MongoDB**, **JWT Auth**, and **OpenAI GPT**. This backend allows users to manage bookings, travellers, and auto-generate booking summaries using AI.

    ---

    ## 🛠 Tech Stack

    - **Next.js API Routes** — Serverless backend
    - **MongoDB Atlas** — Scalable NoSQL cloud database
    - **JWT Authentication** — Access token-based auth
    - **OpenAI GPT (gpt-3.5-turbo)** — AI-powered booking summaries
    - **TypeScript** — Type-safe development
    - **Postman** — API testing and documentation

    ---

    ## 📂 Folder Structure

    ```bash
    b2c-booking-api/
    ├── controllers/
    │   ├── auth.controller.ts
    │   ├── order.controller.ts
    │   └── traveller.controller.ts
    ├── middleware/
    │   └── auth.ts
    ├── models/
    │   ├── User.ts
    │   ├── Order.ts
    │   └── Traveller.ts
    ├── pages/
    │   └── api/
    │       ├── auth/
    │       │   ├── signup.ts
    │       │   └── login.ts
    │       ├── orders/
    │       │   ├── index.ts
    │       │   └── [id]/summary.ts
    │       └── travellers/
    │           └── index.ts
    ├── services/
    │   ├── jwt.service.ts
    │   └── openai.service.ts
    ├── utils/
    │   └── dateUtils.ts
    ├── types/
    │   └── order.ts
    ├── .env.local
    └── README.md

    ⚙️ Environment Setup
    Create a .env.local file in the root:

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key


    After that 
    git clone https://github.com/your-username/b2c-booking-api.git
    npm install
    npm run dev


    🔐 JWT Authentication
    JWT token is required for all booking and traveller routes.
    Add token to Authorization header:
    Bearer <token>



    📲 API Endpoints
    👤 Auth
    Route	Method	Description
    /api/auth/signup	POST	Register a new user
    /api/auth/login	POST	Login and get JWT token

    🧳 Orders
    Route	Method	Description
    /api/orders	GET	Get bookings by user (filtered)
    /api/orders	POST	Create a new booking
    /api/orders/:id/summary	GET	Generate booking summary via GPT

    👥 Travellers
    Route	Method	Description
    /api/travellers	POST	Add a traveller
    /api/travellers	PUT	Update a traveller
    /api/travellers	DELETE	Delete a traveller


    🧪 Postman Collection
Import Booking API Collection.postman_collection.json into Postman.