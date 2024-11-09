FROM --platform=$BUILDPLATFORM node:18-bullseye-slim AS build

WORKDIR /app

RUN npm install -g @angular/cli@18.2

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]

FROM build AS dev-envs

RUN apt-get update && apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
