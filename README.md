# Harry Potter Info Viewer

Welcome to the Harry Potter info viewer porject. In this repository you will find an web application that
consumes an public API of Harry Potter information.
In includes characters, movies, potions and other information from the famous saga.

Currently, you can access to the project deployed in:
 - [github_pages](https://gilmaramezquita.github.io/Harry_Potter/)
 - [local_deploy] cloning the repository(#Execute project)

# Execute Project

If you wanna try this project, you can clone it.
In the directoy you have to do:

```js
   npm install
   npm run dev
```
With the first command you will install all the dependencies marked in package.json
The second command make a local deploy of the current project, so you can view your changes there.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
