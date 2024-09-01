FROM node:18-alpine AS build

RUN apk update && apk upgrade 

RUN addgroup -S appgroup && adduser -S frontend -G appgroup

WORKDIR /app
COPY --chown=frontend:appgroup package*.json ./

RUN npm install --quiet && npm cache clean --force

COPY --chown=frontend:appgroup . .
RUN npm run build --prod

EXPOSE 4200

USER frontend

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
