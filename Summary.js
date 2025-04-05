import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Summary({ route }) {
  console.log(route.params);

  const { crcTotal, questionBank, selectedAnswers } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Summary</Text>
        <Text style={styles.totalCorrect}>
          {crcTotal}/{questionBank.length} Correct
        </Text>
        <FlatList
          data={questionBank}
          renderItem={({ item, index }) => {
            const userChoices = selectedAnswers[index];
            const correctChoices = Array.isArray(item.correct)
              ? item.correct.map((id) => item.choices[id]) // multiple-answer
              : [item.choices[item.correct]]; // single correct choice

            return (
              <View style={styles.questionContent}>
                <Text style={styles.questionPrompt}>{item.prompt}</Text>
                {item.choices.map((choice, choiceIndex) => {
                  const isSelected = userChoices.includes(choice);
                  const isCorrect = correctChoices.includes(choice);

                  let choiceStyle = styles.choiceText;
                  if (isSelected && isCorrect) {
                    choiceStyle = [styles.choiceText, styles.correctChoice];
                  } else if (isSelected && !isCorrect) {
                    choiceStyle = [styles.choiceText, styles.incorrectChoice];
                  }

                  return (
                    <Text key={choiceIndex} style={choiceStyle}>
                      {choice}
                    </Text>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    margin: 60,
    fontSize: 50,
    fontWeight: "bold",
  },

  choices: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  questionContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  questionPrompt: {
    fontWeight: "bold",
  },

  pageTitle: {
    fontSize: 70,
    justifyContent: "center",
  },

  totalCorrect: {
    fontSize: 30,
  },

  header: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  choiceText: {
    fontSize: 16,
    marginBottom: 6,
    paddingLeft: 10,
  },

  correctChoice: {
    color: "#2e7d32",
    borderRadius: 5,
    padding: 5,
    fontWeight: "bold",
  },

  incorrectChoice: {
    color: "#c62828",
    borderRadius: 5,
    padding: 5,
    fontWeight: "bold",
  },
});
