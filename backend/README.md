# Predictive Internal Backend

This is the backend API for Predictive Internal, providing endpoints for fund management, investments, and user authentication.

## API Documentation

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "role": "fund_manager"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "fund_manager",
  "createdAt": "2024-03-20T10:00:00Z"
}
```

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "fund_manager"
  }
}
```

### Funds

#### POST /api/funds
Create a new fund.

**Request Body:**
```json
{
  "name": "Venture Capital Fund I",
  "description": "Early-stage technology investments",
  "targetAmount": 100000000,
  "currentAmount": 50000000,
  "status": "active",
  "startDate": "2024-01-01",
  "endDate": "2029-12-31"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Venture Capital Fund I",
  "description": "Early-stage technology investments",
  "targetAmount": 100000000,
  "currentAmount": 50000000,
  "status": "active",
  "startDate": "2024-01-01",
  "endDate": "2029-12-31",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### GET /api/funds
Get all funds for the authenticated user.

**Response:**
```json
{
  "funds": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Venture Capital Fund I",
      "description": "Early-stage technology investments",
      "targetAmount": 100000000,
      "currentAmount": 50000000,
      "status": "active",
      "startDate": "2024-01-01",
      "endDate": "2029-12-31"
    }
  ]
}
```

#### GET /api/funds/:id
Get a specific fund by ID.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Venture Capital Fund I",
  "description": "Early-stage technology investments",
  "targetAmount": 100000000,
  "currentAmount": 50000000,
  "status": "active",
  "startDate": "2024-01-01",
  "endDate": "2029-12-31",
  "investments": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "companyName": "Tech Startup Inc",
      "amount": 5000000,
      "status": "active"
    }
  ]
}
```

### Investments

#### POST /api/investments
Create a new investment.

**Request Body:**
```json
{
  "fundId": "123e4567-e89b-12d3-a456-426614174000",
  "companyName": "Tech Startup Inc",
  "websiteUrl": "https://techstartup.com",
  "founderEmail": "founder@techstartup.com",
  "amount": 5000000,
  "estimatedValue": 25000000,
  "postMoneyValuation": 30000000,
  "type": "equity",
  "status": "active",
  "investmentDate": "2024-03-20",
  "notes": "Series A investment in promising AI startup"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "fundId": "123e4567-e89b-12d3-a456-426614174000",
  "companyName": "Tech Startup Inc",
  "websiteUrl": "https://techstartup.com",
  "founderEmail": "founder@techstartup.com",
  "amount": 5000000,
  "estimatedValue": 25000000,
  "postMoneyValuation": 30000000,
  "type": "equity",
  "status": "active",
  "investmentDate": "2024-03-20",
  "notes": "Series A investment in promising AI startup",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### GET /api/investments
Get all investments for the authenticated user.

**Response:**
```json
{
  "investments": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "fundId": "123e4567-e89b-12d3-a456-426614174000",
      "companyName": "Tech Startup Inc",
      "amount": 5000000,
      "status": "active",
      "investmentDate": "2024-03-20"
    }
  ]
}
```

#### GET /api/investments/:id
Get a specific investment by ID.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "fundId": "123e4567-e89b-12d3-a456-426614174000",
  "companyName": "Tech Startup Inc",
  "websiteUrl": "https://techstartup.com",
  "founderEmail": "founder@techstartup.com",
  "amount": 5000000,
  "estimatedValue": 25000000,
  "postMoneyValuation": 30000000,
  "type": "equity",
  "status": "active",
  "investmentDate": "2024-03-20",
  "notes": "Series A investment in promising AI startup",
  "documents": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174002",
      "name": "Investment Agreement.pdf",
      "type": "pdf",
      "url": "https://storage.example.com/documents/investment-agreement.pdf"
    }
  ]
}
```

### Limited Partners

#### POST /api/limited-partners
Create a new limited partner.

**Request Body:**
```json
{
  "name": "Acme Corporation",
  "email": "investments@acme.com",
  "phone": "+1-555-0123",
  "address": "123 Business Ave, Suite 100, San Francisco, CA 94105",
  "type": "corporate",
  "commitmentAmount": 10000000,
  "fundId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174003",
  "name": "Acme Corporation",
  "email": "investments@acme.com",
  "phone": "+1-555-0123",
  "address": "123 Business Ave, Suite 100, San Francisco, CA 94105",
  "type": "corporate",
  "commitmentAmount": 10000000,
  "fundId": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### GET /api/limited-partners
Get all limited partners for the authenticated user.

**Response:**
```json
{
  "limitedPartners": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174003",
      "name": "Acme Corporation",
      "email": "investments@acme.com",
      "type": "corporate",
      "commitmentAmount": 10000000,
      "fundId": "123e4567-e89b-12d3-a456-426614174000"
    }
  ]
}
```

### Fund Updates

#### POST /api/fund-updates
Create a new fund update.

**Request Body:**
```json
{
  "fundId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Q1 2024 Performance Update",
  "content": "The fund has made significant progress in Q1 2024...",
  "type": "performance",
  "date": "2024-03-20"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174004",
  "fundId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Q1 2024 Performance Update",
  "content": "The fund has made significant progress in Q1 2024...",
  "type": "performance",
  "date": "2024-03-20",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### GET /api/fund-updates
Get all fund updates for a specific fund.

**Query Parameters:**
- `fundId`: UUID of the fund

**Response:**
```json
{
  "updates": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174004",
      "title": "Q1 2024 Performance Update",
      "content": "The fund has made significant progress in Q1 2024...",
      "type": "performance",
      "date": "2024-03-20"
    }
  ]
}
```

### Documents

#### POST /api/documents
Upload a new document.

**Request Body:**
```json
{
  "name": "Investment Agreement.pdf",
  "type": "pdf",
  "url": "https://storage.example.com/documents/investment-agreement.pdf",
  "investmentId": "123e4567-e89b-12d3-a456-426614174001"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "name": "Investment Agreement.pdf",
  "type": "pdf",
  "url": "https://storage.example.com/documents/investment-agreement.pdf",
  "investmentId": "123e4567-e89b-12d3-a456-426614174001",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### GET /api/documents
Get all documents for a specific investment.

**Query Parameters:**
- `investmentId`: UUID of the investment

**Response:**
```json
{
  "documents": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174002",
      "name": "Investment Agreement.pdf",
      "type": "pdf",
      "url": "https://storage.example.com/documents/investment-agreement.pdf",
      "investmentId": "123e4567-e89b-12d3-a456-426614174001"
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": ["Field 'email' is required", "Invalid date format"]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/predictive-internal.git
cd predictive-internal/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/predictive_internal
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:
```bash
npm run migrate
```

### Development

To start the development server:

```bash
npm run dev
```

This will run the server in development mode with hot reloading enabled.

### Testing

To run the test suite:

```bash
npm test
```

## License

This project is proprietary and confidential. 