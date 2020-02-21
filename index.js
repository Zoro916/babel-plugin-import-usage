
const babelTypes = require('babel-types');
const visitor = {
  ImportDeclaration(path, _ref = { opts: {} }) {
    const specifiers = path.node.specifiers;
    const source = path.node.source;
    if (_ref.opts.libraryName == source.value && (!babelTypes.isImportDefaultSpecifier(specifiers[0]))) { //_ref.opts是传进来的参数
      const declarations = specifiers.map((specifier) => {
        return babelTypes.ImportDeclaration(
          [babelTypes.importDefaultSpecifier(specifier.local)],
          babelTypes.StringLiteral(`${source.value}/${specifier.local.name}`)
        )
      })
      path.replaceWithMultiple(declarations)
    }
  }

};
module.exports = function (babel) {
  return { visitor };
}
