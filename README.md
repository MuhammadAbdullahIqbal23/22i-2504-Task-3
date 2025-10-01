# User Management System - Full Stack React Application

A complete full-stack web application built with React, Node.js, Express, PostgreSQL, and Docker. This application provides a user management system with data persistence and containerized deployment.

## 🚀 Features

- **Frontend**: React application with responsive user interface
- **Backend**: RESTful API built with Node.js and Express
- **Database**: PostgreSQL with data persistence
- **Containerization**: Docker setup with custom network
- **Watch Mode**: Hot reloading for development
- **Data Persistence**: Data survives container restarts
- **User Management**: Create, read, and delete users
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Mobile-friendly interface

## 📋 User Form Fields

- **Name**: User's full name (required)
- **Email**: User's email address (required, unique)
- **City**: User's city (required)
- **Country**: User's country (required)

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Task-3
   ```

2. **Build and start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Using Docker with Watch Mode (Development)

For development with hot reloading:

```bash
docker-compose up --watch
```

This enables automatic reloading when you make changes to the source code.

## 📦 Available Commands

### Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start with watch mode (hot reloading)
docker-compose up --watch

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

### Local Development Commands

```bash
# Install all dependencies
npm run setup

# Start both frontend and backend
npm run dev

# Start only frontend
npm run frontend:dev

# Start only backend
npm run backend:dev
```

## 🌐 API Endpoints

### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - API health status

### Example API Usage

**Create User:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "city": "New York",
    "country": "USA"
  }'
```

**Get All Users:**
```bash
curl http://localhost:5000/api/users
```

## 🗄️ Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📁 Project Structure

```
Task-3/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── Dockerfile
│   └── package.json
├── backend/                  # Node.js/Express API
│   ├── server.js            # Main server file
│   ├── Dockerfile
│   └── package.json
├── database/                 # Database initialization
│   └── init.sql             # Database schema
├── docker-compose.yml        # Docker services configuration
├── package.json             # Root package.json
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

**Backend:**
- `NODE_ENV`: Development/Production mode
- `DB_HOST`: Database host (default: database)
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name (default: userdb)
- `DB_USER`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: password)

**Frontend:**
- `REACT_APP_API_URL`: Backend API URL (default: http://backend:5000)

### Docker Network

The application uses a custom Docker network called `user-management-network` for service communication.

## 💾 Data Persistence

The application uses Docker volumes to ensure data persistence:

- PostgreSQL data is stored in a named volume `postgres_data`
- Data survives container restarts and rebuilds
- To completely reset data, remove the volume: `docker-compose down -v`

## 🔄 Development Workflow

1. **Make changes** to your code
2. **With watch mode**: Changes are automatically reflected
3. **Without watch mode**: Restart the specific service:
   ```bash
   docker-compose restart frontend  # or backend
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check if ports are in use
   netstat -an | grep :3000
   netstat -an | grep :5000
   netstat -an | grep :5432
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   docker-compose logs database
   
   # Restart database service
   docker-compose restart database
   ```

3. **Clear everything and start fresh**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database

# Execute commands in running containers
docker-compose exec backend sh
docker-compose exec database psql -U postgres -d userdb
```

## 🧪 Testing the Application

1. **Open the application** at http://localhost:3000
2. **Fill out the user form** with:
   - Name: John Doe
   - Email: john@example.com
   - City: New York
   - Country: USA
3. **Submit the form** - user should appear in the table below
4. **Test data persistence**:
   ```bash
   docker-compose down
   docker-compose up
   ```
   - Navigate to http://localhost:3000
   - Previously added users should still be visible

## 🌟 Advanced Features

### Custom Network

The application uses a custom Docker bridge network for improved service isolation and communication.

### Watch Mode

Development-friendly hot reloading is available using Docker Compose watch feature.

### Health Checks

- Database health checks ensure services start in correct order
- API health endpoint for monitoring

### Security Features

- Non-root user in Docker containers
- Input validation and sanitization
- CORS configuration
- Environment variable based configuration

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.