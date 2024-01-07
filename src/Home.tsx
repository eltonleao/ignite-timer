import { createContext, useContext, useState } from "react";

const CyclesContext = createContext(
  {} as { activeCycle: number; setActiveCycle: (cycle: number) => void }
);

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);
  return (
    <div>
      <h1>NewCycleForm: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(activeCycle + 1);
        }}
      >
        click
      </button>
    </div>
  );
}

function CountDown() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);
  return (
    <div>
      <h1>CountDown: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(activeCycle + 2);
        }}
      >
        click
      </button>
    </div>
  );
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0);
  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <CountDown />
      </div>
    </CyclesContext.Provider>
  );
}
