# README #

This README document the steps are necessary to get the application up and running.

### What is this repository for? ###

* This project provide a production ready web service backend server skeleton powered by express, apollo GraphQL server and sequelize.
* Main features
    * Login / logout
    * Basic user account CURD management, support roles setting, support auto creating initial admin account during first run.
    * REST style web service end point
    * GrpahQL end point that support query, mutaion and subscription
    * Database agnostic data service powered by sequelize
    * Flexible configuration management powered by node config
    * Highly modular design, the inter-op of modules are clear and natural
        * REST style web services based on express routing and request dispatching
        * Passport based local authentication strategy to protect REST and GraphQL end point
        * Subscribe hooking is used to authenticate GraphQL subscription websocket connection and provide authorization function for GraphQL subscription
        * Dedicated express middleware that support centralized authorization for REST web services
        * Schema level resolver is used to support centralized authorization for GraphQL queries and mutations. 
        * Micro service oriented design and implementation
        * Modules are organized by natural and layered categories, using following direcory layout convention
            * Topmost are functional categories
                * gql - GraphQL schema definitions
                * middleware - express middle ware
                * resolver - resolvers that link GraphQL requset to service provider
                * routes - express based request routing
                * service - micro service providers
                * sql - sequelize data model definitions
                * utils - generic utils functions
            * Second layer are application domain categories
                * gql, resolver, service, sql are organized this way
                * core - generic and fundamental functions, such as user account and auth management, config management ...
                * ui - user interface related functions, such as ui configuration, ui definition ...
                * bi - business specific functions, according to the application domain
            * Third layer are organized by GraphQL operation type
                * gql, resolver are organized this way
                * type - Type definition / resolver
                * query - Query definition / resolver
                * mutation - Mutation definition / resolver
                * subscription - Subscription definition / resolver
* Version 0.5.0

### How do I get set up? ###

* Summary of set up
    * Get source code: git clone git@bitbucket.org:gqldev/gql-fast-server.git
    * Install yarn if not yet: npm install -g yarn
    * Install dependencies: yarn install
* Configuration
    * Change config/default.json, mainly dbConfig, change it to match your database connection settings
    * Create db and user according to above dbConfig setting
* Dependencies
    * Install, setup and run [gql-fast-client](https://bitbucket.org/gqldev/gql-fast-client/overview) to test the functions
* Run
    * Run in development mode: npm start
* How to run tests
* Deployment instructions
    * Build dist files: npm run build
    * Run in production mode: node dist/index.js

### Code hacking guidelines ###

* For REST web services, reference express documents
    * The default routing convention
        * /_api - all REST service should should reside under this path
        * /_api/public - REST services that are public and does not require login to access
        * /_api/[service]/[subservice] - Routing for your service, such as /_api/user/list
        * /graphql - GraphQL service end point
        * /graphiql - graphiql service entry
        * all other url is used for serving static contents under your webroot (default is ./public)

    * src/routes/user.js could be referenced as example
    * Place routing setup code under src/routes, call micro service to implement the function
    * Place micro service code under src/service/[core | ui | bi] according to its application domain
    * Don't forget to reexport your service export in src/service/index.js to share your service function to other modules
* For GraphQL services, reference Apollo Server documents
    * Channel list service could be referenced as example
        * src/gql/core/[type | query | mutation | subscription]/channel.js - Channel related GraphQL schema definitions
            * src/gql/core/type/channel.js - Channel type definition
            * src/gql/core/query/channel.js - channels query definition
            * src/gql/core/mutation/channel.js - addChannel, removeChannel mutation definition
            * src/gql/core/subscription/channel.js - channelAdded, channelRemoved subscription definition
        * src/resolver/core/[type | query | mutation | subscription]/channel.js - Channel related GraphQL resolver implementation
            * src/resolver/core/type/channel.js - subscribers field resolver for Channel
            * src/resolver/core/query/channel.js - channels query resolver
            * src/resolver/core/mutation/channel.js - addChannel, removeChannel mutation resolver
            * src/resolver/core/subscription/channel.js - channelAdded, channelRemoved subscription resolver
        * src/service/core/channel.js - Channel micro service provider implementation
    * Users list service could be referenced as another example
        * The GraphQL schema definitions and resolvers parts are similar to Channel's
        * But unlike Channel, it use sequelize to implement the micro service provider
            * src/sql/core/user.js - User data model definition for database
* Request resolving/handling process
    * For REST request:
        * req -> routing -> handler -> service provider
    * For GraphQL request:
        * req -> routing -> Apollo Server -> resolver -> service provider [-> sequelize -> db ]
    * For GraphQL subscription subscribe:
        * req -> Apollo SubscriptionServer -> Apollo SubscriptionManager
    * For GraphQL subscription:
        * service provider -> Apollo PubSub -> Apollo SubscriptionManager -> resolver -> Apollo SubscriptionServer

### Authorization setup guidelines ###

* Once incorporating your micro service code, you need to authorize its accessibility
    * Default authorization rules
        * Default authorization rules configration reside in config/auth/default.json
            * Rule support wildcard matching
            * Rule support excluding expresstion such as !/_api/public
        * /_api/public - REST services reside under this path is publicly accessible
        * /_api/* - all REST services reside under this path require login to access, except above ones
        * /graphql* - all GraphQL requests require login to access
        * /graphiql* - graphql requests require login to access
        * For GraphQL service authorization , the Channel list service is used as an example  
    * If the access rule is as simple as "require admin role" to access
        * Modify config/auth/default.json to set the permission
            * For REST service, add its url to routes.requireAdminRole array
            * For GraphQL service, add its name under gql.[query | mutation | subscription].requireAdminRole array accordinglly
    * If customized access rule is required
        * For REST services
            * If the access rule is common to many services, consider write an authorization middle ware, put its code under src/middleware/[your auth middle ware].js, and call it in src/route_init.js
            * Otherwise just add you routing code (where you have code in your authorization rule) under src/routes[your service name].js, and call it in src/route_init.js
        * For GraphQL service
            * If the access rule is common to many services, consider write an authorization function in src/routes/gql.js and call it in schemaLevelAuthResolver()
            * Otherwise just add your authorization code in you service resolver function.

### Client side ui customization services ###
* Two builtin client side ui customization services are provided
    * Menu service - provide side menu customization service
        * Its service is accessible from /_api/user/menu url
            * A json configuration will be returned to the client, client side code will show user a filtered side menu according to this configuration
            * The configuration comes from /config/default.json, under uiConfig.menu.[user role]
    * Dashboard service - provide dashboard customization service
        * Its service is accessible from /_api/user/dashboard url
            * A json configuration will be returned to the client, client side code will show user a customized dashboard according to this configuration
            * The configuration comes from /config/default.json, under uiConfig.dashboard.[user role]
* The menu and dashboard configuration are included in the response to request of /_api/user/info, which is generally the first service to be requested by the client after login

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact