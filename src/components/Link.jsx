import { Text } from '@mantine/core';
import { Link as RLink } from 'react-router-dom';
function Link({ children, to }) {
  return (
    <Text c={'green.0'} component="span">
      <RLink style={{ color: 'inherit', textDecoration: 'none' }} to={to}>
        {children}
      </RLink>
    </Text>
  );
}

export default Link;
