import { StatusBar } from "expo-status-bar";
import { HomeScreen } from "./src/screens/HomeScreen";
import { TaskProvider } from "./src/services/task/providers/TaskProvider";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#dfe3e8" />
      <TaskProvider>
        <HomeScreen />
      </TaskProvider>
    </>
  );
}
