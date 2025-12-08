export const rules = {
  'sort-breakpoints': {
    create(context) {
      const BREAKPOINT_ORDER = ['xs', 'sm', 'md', 'lg', 'xl'];
      const source = context.getSourceCode();

      function getKey(prop) {
        return prop.key.type === 'Literal' ? prop.key.value : prop.key.name;
      }

      function isBreakpointObject(node) {
        if (node.type !== 'ObjectExpression') return false;

        return node.properties.some((prop) => {
          if (prop.type !== 'Property') return false;
          return BREAKPOINT_ORDER.includes(getKey(prop));
        });
      }

      function buildFixedObject(propsMap, indent) {
        const lines = BREAKPOINT_ORDER.map((bp) => {
          const valueNode = propsMap[bp];
          const valueText = valueNode ? source.getText(valueNode.value) : `''`;

          return `${indent}${bp}: ${valueText}`;
        });

        return `{\n${lines.join(',\n')}\n}`;
      }

      return {
        JSXAttribute(attr) {
          if (!attr.value || attr.value.type !== 'JSXExpressionContainer')
            return;
          const expr = attr.value.expression;
          if (!expr || expr.type !== 'ObjectExpression') return;

          if (!isBreakpointObject(expr)) return;

          const propsMap = {};
          const usedKeys = new Set();

          for (const prop of expr.properties) {
            if (prop.type !== 'Property') continue;
            const key = getKey(prop);

            if (BREAKPOINT_ORDER.includes(key)) {
              propsMap[key] = prop;
              usedKeys.add(key);
            }
          }

          const missing = BREAKPOINT_ORDER.filter((bp) => !usedKeys.has(bp));
          const needsFix = missing.length > 0 || usedKeys.size > 1;

          if (!needsFix) return;

          const raw = source.getText(expr);
          const match = raw.match(/\n(\s*)\S/);
          const indent = match ? match[1] : '  ';

          const fixedObjectText = buildFixedObject(propsMap, indent);

          context.report({
            fix(fixer) {
              return fixer.replaceText(expr, fixedObjectText);
            },
            message:
              'Mantine breakpoint object should include xs → sm → md → lg → xl in order.',
            node: expr,
          });
        },
      };
    },

    meta: {
      docs: {
        description:
          'Sort Mantine responsive breakpoint objects and fill missing breakpoints',
      },
      fixable: 'code',
      schema: [],
      type: 'suggestion',
    },
  },
};
