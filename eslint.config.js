import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'ignore',
      }],
    },
  },
)
