FROM node:16 as base-stage 

# Create app directory
WORKDIR /app 

# Install app dependencies
COPY package*.json ./ 

RUN npm install 
COPY . .

# develop stage 
FROM base-stage as development-stage 
CMD ["npm", "run", "dev"]

# production stage 
FROM base-stage as production-stage 
CMD ["npm", "run", "prod"]
