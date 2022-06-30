## June 30, 2022

* version: 1.0.4
* installed:
    * azure/storage-blob
* src: 
    * storage class
    * storage route
    * storage test

## June 25, 2022

* version: 1.0.3
* installed: 
    * Supertest
* src: 
    * added index.ts and /api/status
    * tsconfig - "resolveJsonModule": true
    * 404 test

* research:
    * https://losikov.medium.com/part-4-node-js-express-typescript-unit-tests-with-jest-5204414bf6f0
    * https://github.com/losikov/api-example/blob/master/src/tests/user.ts
    * https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/app.ts

## June 20, 2022

### branch: 4t/0620-swap
* Scripts/app-service-swap-slot.sh

### branch: diberry/0616-config
* version: 1.0.2
* Installed:
    * Mongodb native driver
* Src
    * /data?collection=collectionName
    * ./src/mongo-database.ts

## June 16, 2022

### 

### branch: diberry/0615-jest
* version: 1.0.1
* Installed:
    * ts-node-dev - run transpile and watch better than ts-node
        * Q: do I still need ts-node if using ts-node-dev
    * debug - print out routes and debug info for express
    * cross-env - make sure env passed is works in all environments
    * ts-node - changed version of ts-node to 10.6.0 based on this [SO issue](https://stackoverflow.com/questions/72586253/typescript-debug-failure-false-expression-non-string-value-passed-to-ts-reso)
* package.json:
    * script names
        * :dev - should run locally
    * script - "dev"
        * watch/reload on .ts changes
        * load env file
        * debug express output
    * script - "build"
        * renamed to build:dev so that App Service doesn't try to build tsc that doesn't exist 
* src:
    * app.ts
        * add debug to see route requests in express
        * add timestamp to see that changes cause rebuild during dev


```
    "info:dev": "following scripts are for local development",
    "start:dev": "cross-env-shell DEBUG=express:* ts-node-dev -r dotenv/config ./src/app.ts dotenv_config_path=./.env dotenv_config_debug=true",
    "test:dev": "jest --runInBand --detectOpenHandles --forceExit --verbose --coverage",

    "info:cicd:": "following scripts are for CICD actions/pipelines",
    "build:cicd": "tsc && cp ./package.json ./dist/ && ls -la",
    "test:cicd": "npm run actions:test:coverage-report",

    "info:production": "following scripts are for Azure App Service",
    "build": "echo 'no build during App Service zip deploy'",
    "start": "node app.js",

    "actions:test:coverage-report": "jest --runInBand --detectOpenHandles --testTimeout=20000 --forceExit --verbose  --json --outputFile=./jest-log.json",

```

## June 15, 2022

* jest
* debug/ts-node
* add env in package.json script instead of code