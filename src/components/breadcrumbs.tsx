import { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSearchParams } from "react-router-dom";

interface pathItem {
  name: string;
}
interface BreadcrumbProps {
  path: pathItem[];
}

const Breadcrumbs = ({ path }: BreadcrumbProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [crumbs, setCrumbs] = useState<pathItem[]>(path);
  const crumbsRef = useRef<pathItem[]>(path);

  useEffect(() => {
    setCrumbs((prevCrumbs) => {
      const newCrumbs = path.filter(
        (p) => !prevCrumbs.some((crumb) => crumb.name === p.name)
      );
      const updatedCrumbs = [...prevCrumbs, ...newCrumbs];
      crumbsRef.current = updatedCrumbs;
      return updatedCrumbs;
    });
  }, [path]);

  useEffect(() => {
    const currentQuest = searchParams.get("quest");
    if (currentQuest) {
      const index = crumbsRef.current.findIndex(
        (crumb: { name: string }) => crumb.name === currentQuest
      );
      if (index !== -1) {
        const updatedCrumbs = crumbsRef.current.slice(0, index + 1);
        crumbsRef.current = updatedCrumbs;
        setCrumbs(updatedCrumbs);
      }
    }
  }, [searchParams]);

  const handleUpdateParams = (link: string) => {
    const index = crumbsRef.current.findIndex((crumb) => crumb.name === link);
    if (index !== -1) {
      const updatedCrumbs = crumbsRef.current.slice(0, index + 1);
      crumbsRef.current = updatedCrumbs;
      setCrumbs(updatedCrumbs);
    }

    // Update search params
    searchParams.set("quest", link);
    setSearchParams(searchParams);
  };

  return (
    <Breadcrumb>
      {/* Don't show if there's only 1 item */}
      {crumbs.length > 1 && (
        <BreadcrumbList>
          {/* First Item */}
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => handleUpdateParams(crumbs[0].name)}>
              {crumbs[0].name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Dropdown for Intermediate Items */}
          {crumbs.length > 3 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {crumbs.slice(1, -2).map((item) => (
                      <DropdownMenuItem
                        onClick={() => handleUpdateParams(item.name)}
                        key={item.name}
                      >
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}

          {/* Second-to-Last Item */}
          {crumbs.length >= 2 &&
            crumbs[crumbs.length - 2].name !== crumbs[0].name && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() =>
                      handleUpdateParams(crumbs[crumbs.length - 2].name)
                    }
                  >
                    {crumbs[crumbs.length - 2].name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

          {/* Last Item */}
          {crumbs.length >= 1 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {crumbs[crumbs.length - 1].name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
