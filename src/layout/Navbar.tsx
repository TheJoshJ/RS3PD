import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchCheckIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const TestButtons = {
  Home: { text: "Home", link: "/" },
  Player: { text: "Player", link: "/player" },
  JJ_Player: { text: "JJ Player", link: "/player/thejoshj" },
  Quests: { text: "Quests", link: "/quests" },
  JJ_Quests: { text: "JJ Quest", link: "/quests/thejoshj" },
  Quest: { text: "Quest", link: "/quest/haunted_mine" },
  Not_Found: { text: "404", link: "404" },
};

const NavButtons = {
  Home: { text: "Home", link: "/" },
  Player: { text: "Player", link: "/player" },
  Quests: { text: "Quests", link: "/quests" },
};

const Navbar = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <div className="flex justify-between p-2 px-10">
        <div className="flex gap-2">
          {Object.entries(TestButtons).map(([key, { text, link }]) => (
            <Button
              variant="ghost"
              key={key}
              onClick={() => {
                navigate(link);
              }}
            >
              {text}
            </Button>
          ))}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Input
            placeholder="Username"
            className="text-black"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
          <Button
            size="icon"
            onClick={() => {
              navigate(`/player/${searchVal}`);
            }}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
      <p className="flex justify-start p-2 px-10">
        This is just to help me navigate between pages and will be replaced down
        the line
      </p>
    </>
  );
};

export default Navbar;
