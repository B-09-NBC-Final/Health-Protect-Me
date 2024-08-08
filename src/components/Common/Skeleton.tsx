const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`bg-gray200 shader-container ${className}`}></div>;
};

export default Skeleton;
