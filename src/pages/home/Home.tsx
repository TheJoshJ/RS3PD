import { Autocomplete } from "@/layout/components/Autocomplete";

function Home() {
  return (
    <div className="grid grid-rows-3 h-[calc(100vh-70px)]">
      <div className="flex items-end justify-center pb-4">
        <h1 className="text-4xl font-bold">RS3 Player Dashboard</h1>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={"rounded-xl w-[350px]"}
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
          }}
        >
          <Autocomplete />
        </div>
      </div>
      <div className="flex items-end justify-center pb-4">
        <p>
          Shout out to the{" "}
          <a
            href={"https://ui.shadcn.com/"}
            className="text-blue-500 underline"
          >
            component library
          </a>
        </p>
      </div>
    </div>
  );
}

export default Home;
