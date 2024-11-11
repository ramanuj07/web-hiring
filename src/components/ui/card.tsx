const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {children}
  </div>
);

export default Card;
