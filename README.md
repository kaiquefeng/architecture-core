# Architecture Core

A architecture core is focused in formating project structure following a model pre-defined

## Based structure React

```bash
.
└── src/
    ├── pages/
    │   ├── home/
    │   │   ├── home.tsx
    │   │   ├── home.types.ts
    │   │   └── index.ts
    │   ├── profile/
    │   │   └── ...
    │   └── ...
    ├── enums/
    │   └── http-status-code.ts
    ├── features/
    │   └── authentication/
    │       ├── components
    │       ├── hooks
    │       ├── adapters/
    │       │   ├── generate-token/
    │       │   │   ├── generate-token.ts
    │       │   │   └── index.ts
    │       │   └── ...
    │       ├── contexts/
    │       │   ├── auth/
    │       │   │   ├── auth.tsx
    │       │   │   ├── auth.types.ts
    │       │   │   └── index.ts
    │       │   └── ...
    │       ├── services/
    │       │   ├── authentication-other.ts
    │       │   └── ...
    │       ├── layouts
    │       ├── index.ts
    │       └── ...
    ├── components/
    │   └── component-name/
    │       ├── shared/
    │       │   └── component-name/
    │       │       ├── component-name.tsx
    │       │       ├── component-name.test.ts
    │       │       └── component-name.types.ts
    │       ├── component-name.tsx
    │       ├── component-name.test.ts
    │       ├── component-name.types.ts
    │       ├── index.ts
    │       └── ...
    ├── services/
    │   ├── api.ts
    │   └── ...
    └── ...

```

### pages

In this folder, the structure is organized based on the application pages. Each subdirectory, such as "home" and "profile," contains files related to the corresponding page, such as React components (e.g., home.tsx), specific types (e.g., home.types.ts), and an indexing file to facilitate imports.

### enums

The "enums" folder houses files that define enumerations used in various parts of the application. For example, the file "http-status-code.ts" focuses on enumerating HTTP status codes, providing centralized and consistent reference throughout the code.

### features

This folder should contain independent features and everything they need, as long as they are not used by other parts of the application. If you need to implement something new, start here.

If you have a component or a hook used only in a feature, then they should be stored in that feature's folder. Otherwise, place them in their respective global folders within src. Your index file should export everything that can be imported by pages and/or other features.

### components

This folder houses reusable components with no integration that can be shared across different parts of the application. Each subdirectory, such as "component-name," organizes component files, including a "shared" folder for shared resources like sub-components. The "index.ts" file facilitates importing the component into other parts of the application. For example, the "form" folder should store form-specific components (checkboxes, text inputs, date pickers, etc.).

### layouts

This is a special folder to place any component that needs integration with the back-end or is a composition of pure components.

## Installation

```bash
yarn add -D architecture-core
```

## Commands

Commands to use on terminal using `npx ...`

| Command                           | Action command                                                                                   |
| --------------------------------- | :----------------------------------------------------------------------------------------------- |
| **create-feature** {name-feature} | {**name-feature**} used to write a new feature name to create on project, on folder src/features |

## Usage example

```bash
npx create-feature authentication
```
