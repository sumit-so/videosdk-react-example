export const ListContainer = ({ isOpen, children }) => {
  return (
    <div
      className={`${isOpen ? 'fixed' : 'hidden'} z-1 right-0 top-0 w-[400px] h-full bg-gray-700`}
    >
      {children}
    </div>
  );
};
