module.exports = function(plop) {
  plop.setGenerator('React', {
    description: 'empty component for React framework',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please, example "Button"',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../../semcore/{{ dashCase name}}',
        templateFiles: 'template-react/**',
        globOptions: {
          dot: true,
          ignore: [
            'template-react/src/Component.tsx',
            'template-react/src/style/style.css',
            'template-react/_package.json',
          ],
        },
      },
      {
        type: 'add',
        path: '../../semcore/{{ dashCase name}}/src/{{ properCase name }}.tsx',
        templateFile: 'template-react/src/Component.tsx',
      },
      {
        type: 'add',
        path: '../../semcore/{{ dashCase name}}/src/style/{{ dashCase name }}.shadow.css',
        templateFile: 'template-react/src/style/style.css',
      },
      {
        type: 'add',
        path: '../../semcore/{{ dashCase name}}/package.json',
        templateFile: 'template-react/_package.json',
      },
    ],
  });
};
