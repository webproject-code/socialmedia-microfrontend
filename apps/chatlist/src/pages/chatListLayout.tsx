import { Container } from '@social-media/evoke-ui';
import React, { ComponentProps } from 'react';

export const ChatListLayout: React.FC<ComponentProps<'div'>> = ({
  children,
  ...props
}) => {
  return (
    <Container className="mx-auto" {...props}>
      {children}
    </Container>
  );
};
