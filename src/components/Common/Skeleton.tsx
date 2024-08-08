const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`rounded-md bg-gray200 shader-container ${className}`}></div>;
};

export default Skeleton;
