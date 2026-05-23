FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Օգտագործում ենք Vite-ի ներքին սերվերը, որը միշտ անսխալ աշխատում է
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]
