# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:lts AS build

WORKDIR /app

COPY package*.json .
# Install all the dependencies
RUN npm install

# Add the source code to app
COPY . .
# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Set working directory to nginx asset directory

# Remove default nginx static assets
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copy static assets from builder stage
COPY --from=build /app/dist/sophie-hr-angular-material /usr/share/nginx/html

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]