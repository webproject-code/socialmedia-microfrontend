import { Button, Card, Stack } from '@social-media/evoke-ui';
import { Link } from 'react-router-dom';

type AuthContainerCardProps = {
  heading: string;
  subHeading?: string;
  footer?: boolean;
  footerText?: string;
  footerLink?: string;
  footerLinkLabel?: string;
  authForm: React.ReactNode;
};

const AuthContainerCard: React.FC<AuthContainerCardProps> = ({
  heading,
  subHeading,
  footerText,
  footerLink,
  footerLinkLabel = 'Add Label',
  authForm,
  footer = false,
}) => {
  return (
    <Card className="bg-light-modalColor dark:bg-dark-modalColor max-w-[450px] rounded-lg mx-2 md:p-4">
      <Card.Header className="text-center">
        <h2 className="text-2xl font-bold text-light-secondary dark:text-dark-secondary mb-1">
          {heading}
        </h2>
        <p className="text-light-silverSteel text-sm">{subHeading}</p>
      </Card.Header>
      <Card.Content className="pt-0">{authForm}</Card.Content>
      {footer && (
        <Card.Footer>
          <Stack justify={'center'} align={'center'} spacing={'small'}>
            <p className="text-gray-500">
              <span>{footerText}</span>
            </p>
            {footerLink && (
              <Button
                asChild={true}
                variant="link"
                className="w-fit text-light-secondary dark:text-white p-0"
              >
                <Link to={footerLink}>{footerLinkLabel}</Link>
              </Button>
            )}
          </Stack>
        </Card.Footer>
      )}
    </Card>
  );
};

export default AuthContainerCard;
