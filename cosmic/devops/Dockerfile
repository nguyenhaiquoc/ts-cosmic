# Base image with Node.js environment
FROM node:20-alpine AS builder

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm ci

# Copy project files
COPY . .

# Build the application (if necessary)
RUN npm run build

# Development image (includes dev dependencies)
FROM builder AS dev

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "start:dev"]

# Testing image (reuses dev image)
FROM dev AS test

# Expose test runner port (optional for test frameworks)
EXPOSE 9876

# Run tests
CMD ["npm", "test"]