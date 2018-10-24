module.exports = {
  globals: {
    server: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-best-practices/recommended'
  ],
  plugins: [
    'prettier'
  ],
  env: {
    'browser': true
  },
  rules: {
    'prettier/prettier': 'error',
    'indent': [2, 2],
    'comma-dangle': ['error', 'never'],
    'quotes': [2, 'single', 'avoid-escape'],
    'no-use-before-define': [2, 'nofunc'],
    'prefer-rest-params': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'space-before-function-paren': ['error', 'never'],
    'camelcase': 0,
    'no-restricted-syntax': [0, 'ForInStatmens'],
    'import/no-extraneous-dependencies': 0,
    'no-console': 1
    /*eslint new-cap: ["error", { "newIsCap": false }]*/
  },
  overrides: [
    // node files
    {
      files: [
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
