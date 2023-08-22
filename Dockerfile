# Use the Ruby 3.2.2 image from Docker Hub as the base image (https://hub.docker.com/_/ruby)
FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y postgresql-client git libvips npm
RUN npm install --global yarn

WORKDIR /app

ARG REACT_APP_GOOGLE_MAPS_API_KEY
ARG REACT_APP_TYPESENSE_API_KEY
ARG REACT_APP_TYPESENSE_HOST
ARG REACT_APP_TYPESENSE_PORT
ARG REACT_APP_TYPESENSE_PROTOCOL

# Add Rails gems
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN bundle install

COPY . .

# Build and deploy React front-end
RUN yarn build && yarn deploy

EXPOSE 3000

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
