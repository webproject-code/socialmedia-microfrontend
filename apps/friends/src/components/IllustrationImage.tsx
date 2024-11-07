import { Box } from '@social-media/evoke-ui';

interface IllustrationImageProps {
  src: string;
  alt: string;
  message?: string;
}

const IllustrationImage: React.FC<IllustrationImageProps> = ({
  src,
  alt,
  message,
}) => {
  return (
    <Box className="flex flex-col h-full items-center justify-center">
      <img src={src} alt={alt} width={600} />
      <h1 className="text-lg md:text-2xl">{message}</h1>
    </Box>
  );
};

export default IllustrationImage;
