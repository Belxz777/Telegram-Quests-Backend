# Используем официальный образ Node.js в качестве базы
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app    

# Копируем package*.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install && npm ci

# Копируем остальные файлы в контейнер
COPY . .

# Строим проект и удаляем ненужные зависимости
RUN npm run build && npm prune --production

# Production
# FROM node:20-alpine AS production
# WORKDIR /usr/src/app

# COPY  --from=build usr/src/app/dist ./dist
# COPY  --from=build usr/src/app/node_modules ./node_modules

# EXPOSE 3000/tcp
# CMD [ "node", "dist/main.js" ]