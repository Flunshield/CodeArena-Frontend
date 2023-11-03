module.exports = {
  parser: '@typescript-eslint/parser', // Spécifie le parseur ESLint pour TypeScript
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Utilise les recommandations de @typescript-eslint/eslint-plugin
    'plugin:react/recommended' // Utilise les recommandations de eslint-plugin-react
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Permet le linting des fichiers JSX
    },
    ecmaVersion: 2018, // Permet de parser les fonctionnalités ECMAScript modernes
    sourceType: 'module', // Permet l'utilisation d'imports
  },
  settings: {
    react: {
      version: 'detect', // Détecte automatiquement la version de React pour linting
    },
  },
  rules: {
    // Ici, vous pouvez ajouter ou écraser des règles spécifiques
  "react/react-in-jsx-scope": "off"
  },
  env: {
    browser: true,
    node: true, // Définit les environnements globaux
  },
};
