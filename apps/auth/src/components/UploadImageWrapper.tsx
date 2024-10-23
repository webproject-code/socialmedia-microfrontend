type DefaultAvatarWrapperProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void; // New prop for click event handling
  children?: React.ReactNode;
};

const UploadImageWrapper: React.FC<DefaultAvatarWrapperProps> = ({
  src,
  alt,
  className,
  onClick,
  children,
}) => {
  return (
    <div
      className={`h-24 w-24 relative cursor-pointer rounded-full overflow-hidden ${className}`}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="object-cover w-full h-full" />
      {children}
    </div>
  );
};

export default UploadImageWrapper;
