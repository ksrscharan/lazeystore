export const rules = {
  'sort-breakpoints': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Sort Mantine responsive breakpoint objects in correct order',
      },
      fixable: 'code',
      schema: [],
    },

    create(context) {
      const BREAKPOINT_ORDER = ['xs', 'sm', 'md', 'lg', 'xl'];

      function isMantineBreakpointObject(node) {
        if (node.type !== 'ObjectExpression') return false;

        return node.properties.every((prop) => {
          if (prop.type !== 'Property') return false;
          const key = prop.key;
          if (key.type === 'Identifier') return BREAKPOINT_ORDER.includes(key.name);
          if (key.type === 'Literal') return BREAKPOINT_ORDER.includes(key.value);
          return false;
        });
      }

      function sortProperties(properties) {
        return [...properties].sort((a, b) => {
          const aKey = a.key.type === 'Literal' ? a.key.value : a.key.name;
          const bKey = b.key.type === 'Literal' ? b.key.value : b.key.name;
          return BREAKPOINT_ORDER.indexOf(aKey) - BREAKPOINT_ORDER.indexOf(bKey);
        });
      }

      return {
        JSXAttribute(attr) {
          if (!attr.value || attr.value.type !== 'JSXExpressionContainer') return;

          const expr = attr.value.expression;
          if (!expr || expr.type !== 'ObjectExpression') return;

          if (!isMantineBreakpointObject(expr)) return;

          const sorted = sortProperties(expr.properties);

          const original = context.getSourceCode().getText(expr);

          // Generate sorted object literal text
          const sortedText =
            '{ ' +
            sorted
              .map((prop) => context.getSourceCode().getText(prop))
              .join(', ') +
            ' }';

          if (original !== sortedText) {
            context.report({
              node: expr,
              message: 'Mantine breakpoint object should follow xs → sm → md → lg → xl order.',
              fix(fixer) {
                return fixer.replaceText(expr, sortedText);
              },
            });
          }
        },
      };
    },
  },
};
