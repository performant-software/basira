source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0.4'

# Use PostgreSQL as the database for Active Record
gem 'pg'

# Use Puma as the app server
gem 'puma', '~> 6.1'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '~> 1.16', require: false

# Devise token authentication
gem 'devise_token_auth'

# Use .env files for environment variables
gem 'dotenv-rails'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

# Resource API
gem 'resource_api', git: 'https://github.com/performant-software/resource-api.git', tag: 'v0.4.2'

# Airtable API integration for seeding and synchronizing data
gem 'airrecord'

# Active storage service
gem 'aws-sdk-s3'

# Image thumbnails
gem 'image_processing', '~> 1.0'

# Data migration
gem 'data_migrate', '~> 9.0'

# Solr for indexing
gem 'rsolr', '~> 2.5'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.1.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
