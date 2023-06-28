require 'optparse'

namespace :users do
  desc 'Creates or updates the user with the specified email to be an admin'
  task admin: :environment do
    options = {}

    option_parser = OptionParser.new
    option_parser.banner = "Usage: rake users:admin -- -e [email]"
    option_parser.on('-e EMAIL', '--email EMAIL') do |value|
      options[:email] = value
    end.parse!

    args = option_parser.order!(ARGV) {}
    option_parser.parse!(args)

    exit 0 unless options[:email].present?

    user = User.find_or_initialize_by(email: options[:email])
    user.update(admin: true)
  end
end
