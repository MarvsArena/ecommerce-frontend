const Container = ({ as: Tag = "section", width = "max-w-7xl", className = "", children }) => (
  <Tag className={`mx-auto w-full ${width} px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`.trim()}>
    {children}
  </Tag>
);

export default Container;
