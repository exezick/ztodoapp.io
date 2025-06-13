FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ \
    && npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]
