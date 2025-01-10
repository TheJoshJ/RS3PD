import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface pathItem {
  name: string;
}
interface BreadcrumbProps {
  path: pathItem[];
}

const crumbsStorageKey = "RS3PD_v1_crumbs";

const getLocalCrumbs = (): pathItem[] => {
  const storedCrumbs = localStorage.getItem(crumbsStorageKey);
  return storedCrumbs ? JSON.parse(storedCrumbs) : [];
};

const setLocalCrumbs = (crumbs: pathItem[]) => {
  localStorage.setItem(crumbsStorageKey, JSON.stringify(crumbs));
};

const QuestCrumbs = ({ path }: BreadcrumbProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navWithParams = (dest: string) => {
    const currentParams = location.search; // Get the current query parameters
    navigate(`${dest}${currentParams}`); // Append them to the new path
  };
  const [crumbs, setCrumbs] = useState<pathItem[]>(getLocalCrumbs());

  // Sync crumbs
  useEffect(() => {
    const storedCrumbs = getLocalCrumbs();
    setCrumbs(storedCrumbs);
  }, []);

  // Unsure but it works
  useEffect(() => {
    const storedCrumbs = getLocalCrumbs();
    const newCrumbs = path.filter(
      (p) => !storedCrumbs.some((crumb) => crumb.name === p.name)
    );
    const updatedCrumbs = [...storedCrumbs, ...newCrumbs];
    setLocalCrumbs(updatedCrumbs);
    setCrumbs(updatedCrumbs);
  }, [path]);

  const handleUpdateParams = (link: string) => {
    const storedCrumbs = getLocalCrumbs();
    const index = storedCrumbs.findIndex((crumb) => crumb.name === link);
    if (index !== -1) {
      const updatedCrumbs = storedCrumbs.slice(0, index + 1);
      setLocalCrumbs(updatedCrumbs);
      setCrumbs(updatedCrumbs);
    }

    navWithParams(`/quests/${link.toLowerCase()}`);
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

export default QuestCrumbs;
