import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
            // Enforce that browser runtime projects do not depend on node runtime projects
            {
              sourceTag: 'runtime:browser',
              notDependOnLibsWithTags: ['runtime:node'],
            },
            // Enforce that node runtime projects do not depend on browser runtime projects
            {
              sourceTag: 'runtime:node',
              notDependOnLibsWithTags: ['runtime:browser'],
            },
            // Customer apps should not depend on admin apps
            {
              sourceTag: 'scope:customer',
              notDependOnLibsWithTags: ['scope:admin'],
            },
            // Admin apps should not depend on customer apps
            {
              sourceTag: 'scope:admin',
              notDependOnLibsWithTags: ['scope:customer'],
            },
            // Constracts cannot import from any other project except other contracts
            {
              sourceTag: 'type:contract',
              onlyDependOnLibsWithTags: ['type:contract'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
