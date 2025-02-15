# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Upgrade npm before installing dependencies
RUN npm install -g npm@11.1.0


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the application port
EXPOSE 3030

# Run the Next.js app
CMD ["npm", "run", "start", "--", "-p", "3030"]
