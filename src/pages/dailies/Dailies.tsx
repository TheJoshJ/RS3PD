import PanelWidget from "@/components/PanelWidget";
import CountdownTimer from "./components/CountdownTimer";
import TaskTable from "./components/TaskTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DailyTasks = [
  {
    id: 1,
    event: "Red Sandstone",
    description: "Mine red sandstone daily",
    moreInfo: "",
  },
  {
    id: 2,
    event: "Crystal-flecked Sandstone",
    description: "Mine crystal-flecked sandstone daily",
    moreInfo: "",
  },
  {
    id: 3,
    event: "Viswax",
    description: "Harvest vis wax from the rune goldberg machine",
    moreInfo: "",
  },
  {
    id: 4,
    event: "Reaper",
    description: "Complete a reaper task for Death",
    moreInfo: "",
  },
  {
    id: 5,
    event: "Divine Locations",
    description: "Use divine locations for daily resources",
    moreInfo: "",
  },
  {
    id: 6,
    event: "Daily Challenges",
    description: "Complete daily challenges for bonus XP",
    moreInfo: "",
  },
  {
    id: 7,
    event: "Jack of Trades",
    description: "Use Jack of Trades aura",
    checkboxes: 3,
    moreInfo: "",
  },
  {
    id: 8,
    event: "Slime Pit",
    description: "Collect slime from the Ectofuntus slime pit",
    moreInfo: "",
  },
  {
    id: 9,
    event: "Nemi Forest",
    description: "Explore the Nemi Forest for rewards",
    moreInfo: "",
  },
  {
    id: 10,
    event: "Premiere Artifact",
    description: "Claim daily Premiere Artifact reward",
    moreInfo: "",
  },
  {
    id: 11,
    event: "Runesphere",
    description: "Interact with the Runesphere for runecrafting XP",
    moreInfo: "",
  },
  {
    id: 12,
    event: "Wicked Hood",
    description: "Claim runes from the Wicked Hood",
    moreInfo: "",
  },
  {
    id: 13,
    event: "Traveling Merchant",
    description: "Check the Traveling Merchant’s wares",
    moreInfo: "",
  },
  {
    id: 14,
    event: "Necro Supplies",
    description: "Obtain necromancy supplies",
    moreInfo: "",
  },
  {
    id: 15,
    event: "Guthixian Cache",
    description: "Participate in Guthixian Cache",
    checkboxes: 2,
    moreInfo: "",
  },
  {
    id: 16,
    event: "Menaphos Obelisk",
    description: "Interact with the Menaphos Obelisk",
    moreInfo: "",
  },
  {
    id: 17,
    event: "Shooting Star",
    description: "Mine Shooting Stars",
    checkboxes: 3,
    moreInfo: "",
  },
  {
    id: 18,
    event: "GWD2 Bounty",
    description: "Complete a GWD2 bounty task",
    moreInfo: "",
  },
];

const WeeklyTasks = [
  { id: 1, event: "Herby Werby", description: "Complete the Herby Werby D&D" },
  { id: 2, event: "Tears of Guthix", description: "Gather tears in the Tears of Guthix D&D" },
  { id: 3, event: "Penguin Hide and Seek", description: "Find all penguins", checkboxes: 12 },
  { id: 4, event: "Advance Time", description: "Use the Advance Time spell", checkboxes: 3 },
];


const MonthlyTasks = [
  { id: 1, event: "Troll Invasion", description: "Defend against Troll Invasion" },
  { id: 2, event: "God Statues", description: "Construct all God Statues", checkboxes: 5 },
  { id: 3, event: "Giant Oyster", description: "Feed and check the Giant Oyster" },
  { id: 4, event: "Effigy Incubator", description: "Complete the Effigy Incubator activity" },
];


const Dailies = () => {
  return (
    <>
      <div className="grid grid-cols-10 grid-rows-[auto] px-8 gap-4">
        <div className="col-start-1 col-end-3 row-start-1 row-end-2 border-secondary border rounded-md">
          <div>
            {/* Time until dailies reset */}
            <PanelWidget title={"Daily Reset"}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-2 justify-center text-center">
                <CountdownTimer cronExpression="0 0 * * *" />
              </div>
            </PanelWidget>
            {/* Time until weekly reset */}
            <PanelWidget title={"Weekly Reset"}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-2 justify-center text-center">
                <CountdownTimer cronExpression="0 0 * * 3" />
              </div>
            </PanelWidget>
            {/* Time until monthly reset */}
            <PanelWidget title={"Monthly Reset"}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-2 justify-center text-center">
                <CountdownTimer cronExpression="0 0 1 * *" />
              </div>
            </PanelWidget>
          </div>
        </div>

        <div className="col-start-3 col-end-11 row-start-1 row-end-2 border-secondary border rounded-md">
          <Tabs defaultValue="Dailies">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="Dailies">Daily</TabsTrigger>
              <TabsTrigger value="Weeklies">Weekly</TabsTrigger>
              <TabsTrigger value="Monthlies">Monthly</TabsTrigger>
              <TabsTrigger value="Events">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="Dailies">
              <TaskTable tasks={DailyTasks} resetSchedule="daily" />
            </TabsContent>
            <TabsContent value="Weeklies">
              <TaskTable tasks={WeeklyTasks} resetSchedule="weekly" resetDay={3} />
            </TabsContent>
            <TabsContent value="Monthlies">
              <TaskTable tasks={MonthlyTasks} resetSchedule="monthly" resetDate={1} />
            </TabsContent>
            <TabsContent value="Events"></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dailies;
