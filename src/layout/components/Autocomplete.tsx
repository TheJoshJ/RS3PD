import { MapIcon, SearchIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import Quests from "@/utils/quests.json";
import Fuse from "fuse.js";
import { useNavigate } from "react-router";

export function Autocomplete() {
  const [selected, setSelected] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const questData = Quests;
  const navigate = useNavigate();

  const fuse = new Fuse(questData.Quests, {
    keys: ["name"],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  const filteredQuestResults = search
    ? fuse
        .search(search)
        .slice(0, 3)
        .map((result) => result.item)
    : questData.Quests.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);

  // Add event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = () => {
    navigate(`/player/${search}`);
  };

  return (
    <div className="relative">
      <Command
        loop
        shouldFilter={false}
        className="rounded-lg border md:min-w-[250px]"
        onClick={() => setSelected(true)}
        onFocus={() => setSelected(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setSelected(false);
          }
        }}
      >
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Search a user or quest..."
        />
        {selected && (
          <div className="absolute left-0 top-full mt-1 z-50 w-full h-auto rounded-lg border bg-background">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {search && (
                <CommandGroup className="border-b">
                  <CommandItem onSelect={handleSearch}>
                    <SearchIcon />
                    <span>Search: {search}</span>
                  </CommandItem>
                </CommandGroup>
              )}
              <CommandSeparator />
              <CommandGroup heading="Quests">
                {filteredQuestResults.length > 0 ? (
                  filteredQuestResults.map((quest) => (
                    <CommandItem
                      onSelect={() => console.log(quest.name)}
                      key={quest.name}
                    >
                      <MapIcon />
                      <span>{quest.name}</span>
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem>
                    <span className="w-[100%] text-center text-sm text-foreground">
                      No matching quests found.
                    </span>
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
