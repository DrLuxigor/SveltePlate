FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "build"]