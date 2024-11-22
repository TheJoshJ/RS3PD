import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex flex-col gap-5 h-auto">
      <p className="text-3xl">Howdy, Partner! 🤠</p>
      <p>
        👇Check out this component library I'm using👇
      </p>
      <div>
        <Button
          onClick={() => {
            window.open("https://ui.shadcn.com/", "_blank");
          }}
        >
          Check It Out
        </Button>
      </div>
    </div>
  );
}

export default App;
