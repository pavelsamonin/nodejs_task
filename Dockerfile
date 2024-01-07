FROM node:16

WORKDIR /app

COPY package*.json ./

# Install build dependencies for bcrypt
RUN apt-get update && \
    apt-get install -y build-essential python && \
    npm install bcrypt

COPY . .

CMD ["npm", "start"]
