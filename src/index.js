// TODO - React Haste module map

const classMethod = {
  ClassMethod: {
    exit(path, {t, className }) {
      const name = path && path.node && path.node.key ? path.node.key.name : "";

      if (name === "render") {
        const blockStatement = path.get('body');
        const lastExpression = blockStatement.get('body').pop();
        const countStatement = t.callExpression(
          t.memberExpression(t.identifier('reactProf'), t.identifier('incrementRenderCount')),
          [t.stringLiteral(className)]
        );

        if (lastExpression.type !== 'ReturnStatement'){
          lastExpression.insertAfter(countStatement);
        } else {
          lastExpression.insertBefore(countStatement);
        }
      }
    }
  },
};

module.exports = function prof({
  types: t,
}) {
  return {
    name: 'prof',
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: {
      Function: {
        enter(path) {
          const className = path.parentPath && path.parentPath.node && path.parentPath.node.id ? path.parentPath.node.id.name : "";
          const name = path && path.node && path.node.id ? path.node.id.name : "";
          const type = path && path.node ? path.node.type : "";

          const blockStatement = path.get('body');
          const blockStatementBody = blockStatement.get('body');

          if (!name || name === "render" || !blockStatement || !blockStatementBody || !blockStatementBody.pop) {
            return;   
          }

          const lastExpression = blockStatementBody.pop();
          const countStatement = t.callExpression(
            t.memberExpression(t.identifier('reactProf'), t.identifier('incrementRenderCount')),
            [t.stringLiteral(name)]
          );

          if (lastExpression && lastExpression.node && lastExpression.node.argument && lastExpression.node.argument.type === "JSXElement") { 
            if (lastExpression.type !== 'ReturnStatement'){
              lastExpression.insertAfter(countStatement);
            } else {
              lastExpression.insertBefore(countStatement);
            }
          }
        }
      },
      Class: {
        enter (path) {
          const className = path && path.node && path.node.id && path.node.id ? path.node.id.name : "";
          path.traverse(classMethod, {t, className });
        },
      },
      Program(path, { file }) {
        const identifier = t.identifier('reactProf');
        const importDefaultSpecifier = t.importNamespaceSpecifier(identifier);
        const importDeclaration = t.importDeclaration([importDefaultSpecifier], t.stringLiteral('babel-plugin-react-prof/src/reactProf.js'));
        path.unshiftContainer('body', importDeclaration);
      }
    },
  };
}