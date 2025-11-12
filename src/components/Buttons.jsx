function BasicButton({ children, ...props }) {
  return (
    <Button {...props} color="green.0">
      <Text>{children}</Text>
    </Button>
  );
}

function GradientButton({
  children,
  deg = 45,
  fromColor = 'green.0',
  toColor = 'green.0',
}) {
  return (
    <Button
      gradient={{ deg: deg, from: fromColor, to: toColor }}
      variant="gradient"
    >
      {children}
    </Button>
  );
}

function OutlineButton({ children }) {
  return (
    <Button color="green.0" variant="outline">
      <Text>{children}</Text>
    </Button>
  );
}

function IconButton({ children, leftSection, rightSection, variant }) {
  return (
    <Button
      leftSection={leftSection}
      rightSection={rightSection}
      variant={variant}
    >
      {children}
    </Button>
  );
}
export { BasicButton, GradientButton, IconButton, OutlineButton };
