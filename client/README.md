# README #

This README document the steps are necessary to get the application up and running.

### What is this repository for? ###

* This project provide a production ready web client app skeleton powered by react, redux, dva, antd and GraphQL.
* Main features
    * Login / Logout
    * Basic user CRUD management function for admin, and support roles setting
    * Server side customizable menu and dashboard settings based on user role
    * Support REST style of backend, use dva to fetch and bind data to props of react component
    * Support GraphQL backend, use Apollo client to fetch and bind data to props of react component
    * Optional GraphQL subscription support
    * Centralized client side configuration in config.js file
    * Antd powered UI.
* Version 0.5.0

### How do I get set up? ###

* Summary of set up
    * Get source code: git clone git@bitbucket.org:gqldev/gql-fast-client.git
    * Install yarn if not yet: npm install -g yarn
    * Install roadhog: npm install -g roadhog
    * Install dependencies: yarn install
* Configuration
    * Change src/utils/config.js accordingly, generally only need to change the branding config items above baseURL.
* Dependencies
    * Install, setup and run [gql-fast-server](https://bitbucket.org/gqldev/gql-fast-server/overview) before run this client app.
* Run
    * Run in development mode: npm run dev 
* How to run tests
* Deployment instructions
    * Don't forget to change baseURL in src/utils/config.js for production deployment
    * Build dist files: npm run build
    * Copy files under dist directory to web server root (for gql-fast-server, it is ./public)
    
### Code hacking guidelines ###

* For routing and REST backend inter-op, reference the dva, redux documents
    * Login and user management are example of this route
* For GraphQL backend inter-op, reference the Apollo react client documents
    * ChannelsList in AdminDashboard is use to demonstrate how GraphQL data binding is working
* Customize your routing in src/router.js
    * Provice placeholder dva model (just as simple as src/models/dashboard.js), even when a route does not require REST data binding.
* Customize your menu in src/utils/menu.js, notice its key is used for routing
* Use AdminDashboard as root container of ui for admin, remove the demonstration code inside and start hacking your own.
* Use UserDashboard as root container of ui for normal user, , remove the demonstration code inside and start hacking your own.
* Keep your code organized
    * Place generic utils under src/utils
    * Place generic pure functional react component under src/components
    * Place react container component under src/routes
    * Place dva model under src/models
    * Provide simple REST service request wrapper under src/services

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact