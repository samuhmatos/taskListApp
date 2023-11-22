import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTask } from "../../services/task/useTask";

export function InputButton() {
  const { add, update, selectedTask } = useTask();

  const inputRef = useRef<TextInput>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      inputRef.current?.focus();
    }
  }, [selectedTask]);

  function handleAddTask() {
    Keyboard.dismiss();

    if (selectedTask) {
      update({ ...selectedTask, title });
    } else {
      add({ title });
    }

    setTitle("");
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.containerInput}
        onPress={() => inputRef.current?.focus()}
      >
        <TextInput
          ref={inputRef}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Adicionar tarefa..."
        />

        <TouchableOpacity style={styles.btnAddTarefa} onPress={handleAddTask}>
          <MaterialCommunityIcons name="send" size={24} color="black" />
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  containerInput: {
    flexDirection: "row",
    gap: 5,
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#2196F3",
  },
  input: {
    flex: 1,
  },
  btnAddTarefa: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
