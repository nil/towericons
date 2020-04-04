module.exports = {
  template: (babel, opts, { imports, componentName, props, jsx, exports }) => {
    return babel.template.ast`
      ${imports}

      function ${componentName}(p) {
        let props = {
          'aria-hidden': p.ariaLabel ? false : true,
          'aria-label': p.ariaLabel,
          className: p.className,
          height: p.height || p.size || p.width,
          width: p.width || p.size || p.height,
          role: 'img',
          viewBox: '0 0 32 32'
        };

        return (
          ${jsx}
        );
      }

      export default ${componentName};
    `
  }
}
