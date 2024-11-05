# foundry-vtt-types

<div align=center>

<img align=center src="./media/img/league-logo-ts.svg" alt="League Logo TS" width="150"/>

TypeScript type definitions for [Foundry Virtual Tabletop](https://foundryvtt.com/) (unofficial)

[![League Discord Server](https://img.shields.io/discord/732325252788387980?label=League%20of%20Extraordinary%20Foundry%20VTT%20Developers)](https://discord.gg/52DNPzqm2Z)
[![npm (tag)](https://img.shields.io/npm/v/@league-of-foundry-developers/foundry-vtt-types/latest)](https://www.npmjs.com/package/@league-of-foundry-developers/foundry-vtt-types)

</div>

## Supported Foundry VTT versions

_(Will the types be backwards compatible, and if so, how far?)_

These type definitions enable full TypeScript type checking for the Foundry API, which is a Very Good Thing. TypeScript offers several advantages over plain JavaScript, including static typing, enhanced tooling, and better support for modern programming practices. More to the point, it will help you spot errors earlier, make your code much easier to work with and navigate, and help make sure even complex refactors don't break everything.  This guide will walk you through setting up your Foundry project to use TypeScript with the `fvtt-types` type definitions.
# Setting Up Your Foundry TypeScript Project
This process can be broadly divided into three steps:
1. Preparing your project to use TypeScript.
2. Preparing TypeScript to use the `fvtt-types` library of Foundry-specific type definitions.
3. Configuring the `fvtt-types` library to match the requirements of your system or module.
   
The remainder of this guide will walk you through each of these steps.
## 1. Preparing Your Project to Use TypeScript
### Installing the TypeScript Compiler
TypeScript is a language designed for developers, meaning it must be compiled into plain JavaScript before Foundry VTT can execute it. To get started, you'll need to install the TypeScript compiler. The easiest way to do this is via [Node.js](https://nodejs.org/en/download/package-manager) and its package manager, `npm`. If you don’t already have Node.js installed, download and install it from the provided link. Then, open your terminal and run the following command:
```bash
npm install -g typescript
```
To confirm the installation, you can check the compiler version by running:
```bash
tsc --version
```
This should display the version number of TypeScript, indicating it has been installed globally.
### Initial Configuration via `tsconfig.json`
Before using TypeScript in Foundry projects, you need to configure it properly. TypeScript’s settings are defined in a `tsconfig.json` file, which should be located at the root of your project directory. This file allows you to customize TypeScript’s behavior, specify which files to compile and which types to include, and set up various compiler options.
To create a basic `tsconfig.json` file, navigate to your project's root directory in the terminal and run:
```bash
tsc --init
```
This command generates a default `tsconfig.json` file with common configuration settings. Next, open `tsconfig.json` and update the following settings to ensure compatibility with the Foundry VTT API:
> (collapsible section containing explanations of each setting)
## 2. Preparing TypeScript to Use the `fvtt-types` Type Definitions
### Installing the `fvtt-types` Type Definitions

### Preparing Your Ambient Type Declarations (`.d.ts`)
Once installed, you'll need to configure `fvtt-types` with type information specific to your project: which subclasses of Actor, Item, etc. you're using; the shapes of their `system` schemas; any settings you've defined; and any flags you'll be using. To keep your project organized, it's recommended to contain all of the `fvtt-types` configuration data in one place. Fortunately, TypeScript provides an ideal feature to enable this, namely, creating a single file of "ambient" type declarations that will apply across your entire project.
> _(feel free to skip ahead if a deeper explanation of what's going on doesn't interest you)_
> ##### Understanding Ambient Types vs. Standard Types
> In TypeScript, **ambient types** are global type declarations that allow you to add type information for entities that exist in the global scope. Unlike "normal" types, which are typically imported and scoped to specific modules (much like variables, classes, or any number of things you're likely already familiar with), ambient types are accessible throughout your entire project without needing imports (to continue our analogy to variables, ambient types are like variables that have been assigned to the global scope via `globalThis` or `window`). They’re often used to provide type information for libraries or APIs that offer global functionality but do not provide comprehensive TypeScript type definitions — much like Foundry VTT!
> 
> ##### `declare global` vs. Ambient Types
> In TypeScript, you can define global types anywhere in your code by simply wrapping the types in a `declare global` block. Functionally, there is little difference between defining your global types this way, or by using an ambient type declaration file. That being said, `.d.ts` files—TypeScript’s **ambient declaration files**—are specifically designed to contain global declarations and type definitions without any compiled output. Files with a `.d.ts` extension serve purely for declaring types and don’t generate JavaScript files during compilation, making them ideal for project-wide configurations.

To pave the way for configuring `fvtt-types` to work with your system or module, follow these steps:
1. **Create a `@types` Folder:** Inside your main scripts folder (or the root directory of your project), create a subfolder named `@types`. This folder will hold all custom type declaration files for your project.
2. **Add a `.d.ts` File:** Inside `@types`, create a new file, such as `fvtt-types-config.d.ts`. This file will hold all the type declarations required by Foundry’s API, making it easier to manage and modify type settings as needed.
3. **Register Your Ambient Types in `tsconfig.json`:** Once your `.d.ts` file is ready, you need to add the `@types` folder to your TypeScript configuration file so the compiler knows where to locate these types. Open your `tsconfig.json` file, and within the `"include"` or `"typeRoots"` field, specify the path to the `@types` folder:

```json
{
  "compilerOptions": {
    ...
  },
  "include": [
    "./@types/**/*",
    ...
  ]
}
```
# Working with FVTT-Types
## Installing FVTT-Types
## Declaration Merging
	very long article, needs some updating - https://github.com/League-of-Foundry-Developers/foundry-vtt-types/wiki/A-Quick-Guide-to-Declaration-Merging
## InterfaceToObject

# Configuring Your Documents
## Configuring Document Subclasses
### DocumentClassConfig
## Configuring Document Schemas
### DataModelConfig
### SourceConfig & DataConfig
#### Generic Types for Document Subclasses
	class K4Actor<Type extends K4ActorType = K4ActorType> extends Actor {
	  declare type: Type;
	  declare system: K4Actor.System<Type>;
## Configuring Document Flags
### FlagConfig
	too short article - https://github.com/League-of-Foundry-Developers/foundry-vtt-types/wiki/Flags

# Configuring Your Settings
## SettingsConfig
	https://github.com/League-of-Foundry-Developers/foundry-vtt-types/wiki/Settings

# Hooks & Game Readiness
## Foundry Initialization Hooks
### AssumeHookRan
## Defining Custom Hooks

# Defining Your API
## Exposing Functionality via `game.module`
### ModuleConfig
## Defining Required Modules
### RequiredModules

# Accessing Foundry's Built-In Libraries
## `system.json`/`module.json` Configuration
## Dynamic Imports
### Example: GreenSock Animation Platform ("GSAP")

# Popular Third-Party Modules
## Modules with Available Type Support
 "FVTT-Types includes full TypeScript definitions for several of the most popular modules used by system and module developers, including ..."
 also: And then I'll add another line clarifying that this doesn't mean other modules aren't available, just that the type definitions aren't.  I'll want to word that carefully so it doesn't imply users shouldn't use modules that don't have available types, though.
### `socketlib`: Synchronizing Data Between Clients
### `libWrapper`: A Wrapper Around One or More Libs
## Generating Types for Other Modules
"if a module is written in TypeScript, you can extract the types and integrate them into your system by ..."
`tsc --noEmit false --emitDeclarationOnly --outDir types` then move them into @types and import them in index.d.ts

## Acknowledgments

Originally forked from [Foundry Project Creator Types](https://gitlab.com/foundry-projects/foundry-pc/foundry-pc-types)
by [@NickEastNL](https://gitlab.com/NvanOosten)

## Contributing

Contributions are very welcome in order to decrease the individual workload. Filing issues for wrong / missing types is
also a great way to help us improve the type definitions.

Development on the current version of Foundry VTT is done on the `main` branch. Additionally, we keep branches for the
older version of Foundry VTT that we still support. These branches are named according to the Foundry VTT version they
correspond to. For example, the branch for Foundry VTT 0.8 is called `foundry-0.8.x`. All work to improve the type
definitions needs to be done through Pull Requests to the relevant branch.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details on how to contribute.

If you have any specific questions, feel free to contact us in the
[League of Extraordinary Foundry Developers Discord](https://discord.gg/52DNPzqm2Z).

## Type-Checking, Linting, Testing

When contributing, make sure that the type checks pass, the linter is green and the tests are green. We _do_ have
checks in the CI but running this locally also helps you while developing and saves you time as you don't have to wait
for the CI.

You can run type checking and linting with the following command:

```shell
npm run lint
```

You can run the tests with

```shell
npm run test
```

## Creating a release

To create a release, you have to create a new release commit, tag it and create a GitHub release from that. The CI will
handle the rest.

```shell
npm version <release-type>
git push --follow-tags
```

## License

This project is licensed under the MIT license. You can find a copy at [LICENSE](LICENSE).
