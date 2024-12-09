import { ReactNode } from "react";
import Navbar from "./Navbar";

interface ParentDivProps {
  children: ReactNode;
}

const PageLayout: React.FC<ParentDivProps> = ({ children }, key) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-5" key={"layout-" + key}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
