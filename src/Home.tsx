import { useState, createContext, useContext } from "react";

interface TestType {
  test: number;
  setTest: (value: number) => void;
}

const TestContext = createContext({} as TestType);

function ComponentA() {
  const { test, setTest } = useContext(TestContext);
  return <div onClick={() => setTest(test * 2)}>Component A says : {test}</div>;
}

function handleIncrement(value: number, callback: (value: number) => void) {
  callback(value + 1);
}

function ComponentB() {
  const { test, setTest } = useContext(TestContext);
  return (
    <button onClick={() => handleIncrement(test, setTest)}>increment</button>
  );
}

export function Home() {
  const [test, setTest] = useState(0);

  return (
    <TestContext.Provider value={{ test, setTest }}>
      <ComponentA />
      <ComponentB />
    </TestContext.Provider>
  );
}
