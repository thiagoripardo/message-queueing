FROM node:lts
WORKDIR /app
COPY . .
COPY ./.env.docker ./.env
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]