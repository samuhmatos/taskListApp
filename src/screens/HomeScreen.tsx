import Constants from "expo-constants";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
} from "react-native";
import { TaskItem } from "../components/TaskItem/TaskItem";
import { Header } from "../components/Header/Header";
import { InputButton } from "../components/InputButton/InputButton";
import { useTask } from "../services/task/useTask";
import { Task } from "../services/task/taskTypes";

export function HomeScreen() {
  const { tasks } = useTask();

  function renderItem({ item }: ListRenderItemInfo<Task>) {
    return <TaskItem task={item} />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <InputButton />

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe3e8",
    marginTop: Constants.statusBarHeight,
  },
});
