FROM node:18-alpine AS build

RUN apk update && apk upgrade && \
    addgroup -S appgroup && adduser -S frontend -G appgroup

WORKDIR /var/www/html

COPY --chown=frontend:appgroup package*.json ./

RUN npm install --quiet && npm cache clean --force && npm install -g @angular/cli@latest

COPY --chown=frontend:appgroup . .

EXPOSE 4200

USER frontend

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
