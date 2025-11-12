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
      variant="gradient"
      gradient={{ deg: deg, from: fromColor, to: toColor }}
    >
      {children}
    </Button>
  );
}

function OutlineButton({ children }) {
  return (
    <Button variant="outline" color="green.0">
      <Text>{children}</Text>
    </Button>
  );
}

function IconButton({ children, leftSection, rightSection, variant }) {
  return (
    <Button
      variant={variant}
      leftSection={leftSection}
      rightSection={rightSection}
    >
      {children}
    </Button>
  );
}
export { BasicButton, GradientButton, IconButton, OutlineButton };
