FROM --platform=linux/amd64 node:alpine
COPY . /app
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
