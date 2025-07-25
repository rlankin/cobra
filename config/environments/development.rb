# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    Bullet.enable        = true
    Bullet.alert         = true
    Bullet.bullet_logger = true
    Bullet.console       = true
    Bullet.rails_logger  = true
    Bullet.add_footer    = true
    Bullet.n_plus_one_query_enable = true
    Bullet.unused_eager_loading_enable = false
    Bullet.counter_cache_enable = false
  end

  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  config.abr_host = 'https://alwaysberunning.net'
  config.abr_auth = 'ABRAUTH'
  config.nrdb = {
    client_id: '17_68q8wwxa2bs4ws0gk4o8wcoo4k8cgk80o8s0kggcsggcww4o48',
    client_secret: '11wixjjki6u8g4kkkss4ksog4gosowg4wswksko48c0gwwc0s',
    redirect_uri: 'http://localhost:3000/oauth/callback'
  }
  config.nrdb_api_host = 'https://api.netrunnerdb.com'

  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

  config.after_initialize do
    Flipper.enable :nrdb_deck_registration
    Flipper.enable :open_list_cut
    Flipper.enable :streaming_opt_out
    Flipper.enable :single_sided_swiss
    Flipper.enable :allow_self_reporting
  rescue StandardError => e
    Rails.logger.warn "Failed setting Flipper features: #{e.class}"
  end
end
