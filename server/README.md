# Bloom Server

A FastAPI server for the Bloom application, part of the Life Collection project.

## Overview

This is a simple FastAPI server that provides API endpoints for the Bloom application. Currently, it includes a basic "Hello World" endpoint to get you started.

## Features

- FastAPI framework for high-performance API development
- Automatic API documentation with Swagger UI
- Type hints and validation support
- Asynchronous request handling
- CORS middleware for frontend integration
- MongoDB integration for data persistence

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn (for running the server)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Bloom/server
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows
```

3. Install dependencies:
```bash
pip install fastapi uvicorn python-multipart python-dotenv pymongo
```

4. Install CORS support for frontend integration:
```bash
pip install fastapi[all]
```

5. Set up environment variables:
Create a `.env` file in the server directory:
```bash
MongoDB_Connection_String=mongodb://localhost:27017
# or for MongoDB Atlas:
# MongoDB_Connection_String=mongodb+srv://username:password@cluster.mongodb.net/bloom
```

## Usage

### Running the Server

To start the development server:

```bash
uvicorn main:app --reload
```

The server will start on `http://localhost:8000` by default.

### API Documentation

Once the server is running, you can access:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

## API Endpoints

### General Endpoints

- **`GET /`** - Welcome message with API information
- **`GET /health`** - Health check endpoint
- **`GET /readme`** - Get README content

### User Management

- **`GET /db/users`** - Get all users
- **`GET /db/user`** - Get user by criteria
- **`POST /db/user/add`** - Create new user
- **`PATCH /db/user/update`** - Update user
- **`DELETE /db/user/delete`** - Delete user
- **`DELETE /db/users/delete`** - Delete all non-admin users

### Resume Management

- **`GET /db/resumes`** - Get all resumes
- **`GET /db/resume`** - Get resume by criteria
- **`POST /db/resume/add`** - Create new resume
- **`PATCH /db/resume/update`** - Update resume
- **`DELETE /db/resume/delete`** - Delete resume
- **`DELETE /db/resumes/delete`** - Delete all resumes

### Business Cards Management

- **`GET /db/business_cards`** - Get all business cards
- **`GET /db/business_card`** - Get business card by criteria
- **`POST /db/business_card/add`** - Create new business card
- **`PATCH /db/business_card/update`** - Update business card
- **`DELETE /db/business_card/delete`** - Delete business card
- **`DELETE /db/business_cards/delete`** - Delete all business cards

### Dashboard

- **`GET /db/dashboard`** - Get dashboard data with counts and documents

**Example Response:**
```json
{
  "message": "Welcome to Bloom API",
  "api_docs": "Visit /docs for interactive API documentation (Swagger UI)",
  "interactive_docs": "Visit /redoc for alternative documentation (ReDoc)"
}
```

## Project Structure

```
server/
├── main.py              # Main FastAPI application
├── models/
│   └── Bloom_DB_Mongo.py # MongoDB models and database operations
├── .env                 # Environment variables (MongoDB connection)
├── README.md            # This file
└── requirements.txt     # Python dependencies (if created)
```

## Development

### Adding New Endpoints

To add new API endpoints, define them in `main.py`:

```python
@app.get("/new-endpoint")
def new_endpoint():
    return {"message": "This is a new endpoint"}
```

### Environment Variables

Consider using environment variables for configuration:

```python
import os
from fastapi import FastAPI

app = FastAPI(
    title="Bloom API",
    description="API for the Bloom application",
    version="1.0.0"
)
```

### CORS Configuration

The server includes CORS middleware to allow frontend applications to make requests:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**For production**, replace `allow_origins=["*"]` with specific frontend URLs:
```python
allow_origins=["http://localhost:3000", "https://yourdomain.com"]
```

## Deployment

For production deployment, consider:

1. Using a production ASGI server like Gunicorn with Uvicorn workers
2. Setting up environment-specific configuration
3. Adding logging and monitoring
4. Implementing proper error handling and validation

Example production command:
```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Troubleshooting

### CORS Issues

If you're getting "Failed to fetch" or CORS errors from your frontend:

1. **Verify CORS is enabled**: Check that your `main.py` includes:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specific frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. **Check server is running**: Ensure your server is running on the expected port
3. **Verify endpoints**: Test endpoints directly using `/docs` or curl
4. **Browser cache**: Clear browser cache or try incognito mode

### Common Issues

- **422 Validation Errors**: Check your request body matches the Pydantic models
- **MongoDB Connection**: Ensure `.env` file has correct `MongoDB_Connection_String`
- **Port conflicts**: If port 8000 is busy, use `uvicorn main:app --reload --port 8001`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Life Collection internal applications.

## Contact

For questions or support, please contact the development team.

---

*This server is part of the Bloom application in the Life Collection project suite.*