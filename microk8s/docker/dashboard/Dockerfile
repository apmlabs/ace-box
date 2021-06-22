# Build
FROM node:alpine AS builder

WORKDIR /tmp
COPY package*.json ./

RUN npm install
COPY . ./

RUN npm run build

# Run
FROM nginx:alpine AS runner

WORKDIR /root/
COPY --from=builder /tmp/build/ /usr/share/nginx/html/