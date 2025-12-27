export const rules = {
  'remove-junk': {
    create(context) {
      const source = context.sourceCode;

      return {
        Program() {
          const text = source.getText();
          const comments = source.getAllComments();
          const fixes = [];

          for (const comment of comments) {
            const val = comment.value.trim();
            if (!val.startsWith('!') && !/^TODO\b/i.test(val)) {
              fixes.push((fixer) => fixer.remove(comment));
            }
          }

          const collapsed = text.replace(/\n{3,}/g, '\n\n');
          if (collapsed !== text) {
            fixes.push((fixer) =>
              fixer.replaceTextRange([0, text.length], collapsed)
            );
          }

          if (fixes.length > 0) {
            context.report({
              fix(fixer) {
                return fixes.map((f) => f(fixer));
              },
              loc: { column: 0, line: 1 },
              message: 'Cleaned up comments and extra newlines',
            });
          }
        },
      };
    },
    meta: {
      docs: {
        description: 'Remove unwanted comments and extra blank lines',
      },
      fixable: 'code',
      schema: [],
      type: 'suggestion',
    },
  },
};
