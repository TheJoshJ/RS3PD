import { ReactNode } from "react";



interface ParentDivProps {
  children: ReactNode;
}

const ProfileWidget: React.FC<ParentDivProps> = ({ children }) => {
  return (
    <div className="h-[250px] p-3 m-3 border-secondary border rounded-md">
      {children}
    </div>
  );
};

export default ProfileWidget;
