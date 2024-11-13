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
    <Box className="flex flex-col h-full items-center justify-center opacity-80">
      <img src={src} alt={alt} width={300} height={300} />
      <h1 className="text-lg md:text-2xl">{message}</h1>
    </Box>
  );
};

export default IllustrationImage;
