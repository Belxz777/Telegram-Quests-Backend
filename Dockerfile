FROM node:20-alpine AS build
WORKDIR /usr/src/app    
RUN npm install && npm ci
COPY package*.json  ./
COPY . .
RUN npm run build && npm prune --production

# Production
# FROM node:20-alpine AS production
# WORKDIR /usr/src/app

# COPY  --from=build usr/src/app/dist ./dist
# COPY  --from=build usr/src/app/node_modules ./node_modules

# EXPOSE 3000/tcp
# CMD [ "node", "dist/main.js" ]