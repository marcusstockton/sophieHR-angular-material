# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

RUN mkdir /usr/local/app && chown node:node /usr/local/app
# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Set working directory to nginx asset directory

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /usr/local/app/dist/sophie-hr-angular-material /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80