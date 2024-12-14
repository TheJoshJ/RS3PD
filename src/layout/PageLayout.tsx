import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";

interface ParentDivProps {
  children: ReactNode;
}

const PageLayout: React.FC<ParentDivProps> = ({ children }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Update the window height when the window resizes
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScrollArea style={{ height: `${windowHeight}px` }}>
      <Navbar />
      {children}
      <Toaster />
    </ScrollArea>
  );
};

export default PageLayout;
