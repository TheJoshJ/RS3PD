import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "@/assets/logo500x.png";
import { Autocomplete } from "./components/Autocomplete";

const NavButtons = {
  Player: { text: "Player", link: "/player" },
  Quests: { text: "Quests", link: "/quests" },
};

const Navbar = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  return (
    <div>
      <div className="flex justify-between p-2 px-10">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} className="w-10 h-10" />
          </Button>
          {Object.entries(NavButtons).map(([key, { text, link }]) => (
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
          <Autocomplete />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
