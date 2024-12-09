import { Button } from "@/components/ui/button";

function Home() {
  return (
      <div className="flex flex-col items-center h-screen">
        <p className="text-3xl">Howdy, Partner! 🤠</p>
        <p>👇Check out this component library I'm using👇</p>
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

export default Home;
