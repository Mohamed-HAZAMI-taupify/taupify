# Pull Docker Hub base image
FROM node:12.18.4
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./

RUN npm install --silent
# Copy app to container
COPY ./ ./
# Run the "dev" script in package.json
# EXPOSE 3000
CMD ["npm", "start"]