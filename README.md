# feathers-plus-admin

> Project feathers-plus-admin

### [Live Demo...](https://feathers-plus-admin.herokuapp.com)

## About

This project uses [FeathersJS](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting  up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/) installed.
2. Install your dependencies.

    ```
    cd path/to/feathers-plus-admin; npm install or yarn install
    ```

3. Environment variables

Add file ".env" to your project to set user environment variables.
See the sample file ".env.dev.example" for development mode or ".env.prod.example" 
for production mode. In environment variables, user's secret data such as user_id, 
user_secret, etc. are usually specified.

4. Start your app for development mode.

to work with the MongoDB database

```bash
  npm run start-mongod or yarn start-mongod 
  ```
Start the local server, so that you can see the application running

  ```bash
  npm run dev or yarn dev
  ```
The application is now running on http://localhost:3030

5. Start your app for production mode

```bash
npm start or yarn start
```

## Testing

Simply run `npm run test:all` or `yarn test:all` and all your tests in the `test/` directory will be run.

## Seed data

Simply run `npm run start:seed` or `yarn start:seed` and all your `fake data` in the `seeds/fake-data.json` 
will be written to the appropriate database.

## Scaffolding

Feathers-plus has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathers-plus/cli          # Install Feathers-plus CLI

$ feathers-plus generate options             # Specify options for this app
$ feathers-plus generate app                 # Generate scaffolding for app
$ feathers generate authentication           # Generate authentication and user-entity service
$ feathers-plus generate secret              # Generate a new secret for authentication
$ feathers-plus generate service             # Generate a new service with its model
$ feathers-plus generate graphql             # Generate a GraphQL endp;oint for services
$ feathers-plus generate all                 # Regenerate the entire app
$ feathers-plus help                         # Show all commands
```

````
Windows 10
The Yeoman toolkit used by cli-plus has an outstanding issue when run on Windows 10 
with Node 10. You either have to call cli-plus from Git Bash using either Node 8 or 10, 
or you have to use Node 8 when calling cli-plus from PowerShell or command.exe. 
The generated code will run on Node 10.
````

## Help

For more information on all the things you can do, visit [the generator](https://generator.feathers-plus.com/), [FeathersJS](http://docs.feathersjs.com) and [extensions](https://feathers-plus.github.io/).

## License

Copyright (c) 2018
Licensed under the [MIT license](LICENSE).
