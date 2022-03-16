module.exports = function (plop) {
  const rootPath = process.cwd();
  plop.setGenerator('React', {
    description: 'empty component for React framework',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please, example "Button"',
      },
      {
        type: 'input',
        name: 'destination',
        message: 'destination folder please, example "components"',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '/{{ destination }}/{{ dashCase name}}',
        templateFiles: 'template-react/**',
        globOptions: {
          dot: true,
          ignore: [
            'template-react/src/Component.js',
            'template-react/src/style/style.css',
            'template-react/_package.json',
          ],
        },
      },
      {
        type: 'add',
        path: '/{{ destination }}/{{ dashCase name}}/src/{{ properCase name }}.js',
        templateFile: 'template-react/src/Component.js',
      },
      {
        type: 'add',
        path: '/{{ destination }}/{{ dashCase name}}/src/style/{{ dashCase name }}.shadow.css',
        templateFile: 'template-react/src/style/style.css',
      },
      {
        type: 'add',
        path: '/{{ destination }}/{{ dashCase name}}/package.json',
        templateFile: 'template-react/_package.json',
      },
    ],
  });
};
