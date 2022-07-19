## LIT / ES6 / MVVM Demo

## Quickstart

To get started:

npm install
npm run start

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Description

This demo illiustrates how a simple MVVM framework can be built using the LIT components along with RXJS, using only ES6. It is not meant to be a usable application, only a demonstration of:

- The relationship between ViewModels and Views
- The relation between ViewModels and services
- Reactivity between services and Viewmodels
- Reactivity between ViewModels and Views

Since the Models are trivial in this example, and also have no type definitions due to the lack of Types in ES6, they are ommitted here. Normally the Models will be Typescript defined interfaces.

The example also illustrates the use of an RXJS BehaviorSubject to achieve reactivity between the layers.
