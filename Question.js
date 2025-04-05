import { useState, useEffect  } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Question() { 

    const navigation = useNavigation();

    const questions = [
        {
          "key": 0,
          "prompt": "Which of the following animals is not a mammal?",
          "type": "multiple-choice",
          "choices": [
          "Dolphin",
          "Bat",
          "Penguin",
          "Elephant",
        ],
        "correct": 2
      },
        {
          "key": 1,
          "prompt": "Choose ALL comic book heroes listed below that are associated with Marvel Comics:",
          "type": "multiple-answer",
          "choices": [
          "Spider-Man",
          "Batman",
          "Iron Man",
          "Invincible",
        ],
        "correct": [0,2]
      },
        {
          "key": 2,
          "prompt": "The sky is red.",
          "type": "true-false",
          "choices": [
          "True",
          "False",
        ],
        "correct": 1
      },
      ]

      const [questionID, incrementID] = useState(0);
      const [chosenArray, addChosen] = useState([]);
      const [correctCount, setCorrectCount] = useState(0);

      const [selectedChoices, selectChoices] = useState([]);
      var updatedCorrectCount = 0;

      console.log(chosenArray);

      const choiceClick = (select) => {
        if (questions[questionID].type === "multiple-choice" || questions[questionID].type === "true-false") {
          selectChoices([select]);
        }if (questions[questionID].type === "multiple-answer") {
          if (selectedChoices.includes(select)) {
            selectChoices(selectedChoices.filter(selectedChoice => selectedChoice !== select));
          } else {
            selectChoices([...selectedChoices, select]);
          }
        } 
        
        
      }

      const handleCheckNext = () => {
        var correctUp = 0;
        if (questions[questionID].type === "multiple-choice" || questions[questionID].type === "true-false") {
          console.log(selectedChoices[0])
          console.log(questions[questionID].choices[questions[questionID].correct])
          console.log(selectedChoices[0] == questions[questionID].choices[questions[questionID].correct]);
          if (selectedChoices[0] == questions[questionID].choices[questions[questionID].correct]) {
              correctUp = 1;
          } 
        } if (questions[questionID].type === "multiple-answer") {
            const checkAllSelectedChoices = (arr, values) => {
              return values.every(value => arr.includes(value));
            };
            var choicesArray = questions[questionID].correct
            var actualChoices =  choicesArray.map((id) => questions[questionID].choices[id])
            console.log(checkAllSelectedChoices(selectedChoices, actualChoices) && selectedChoices.length === choicesArray.length)
            if (checkAllSelectedChoices(selectedChoices, actualChoices) && selectedChoices.length === choicesArray.length) {
              correctUp = 1;
            }
        } 
        if (correctUp === 1) {
          setCorrectCount(prev => prev + 1);
        }

        const updatedChosenArray = [...chosenArray, selectedChoices];
        addChosen(updatedChosenArray);
        console.log(chosenArray);
        selectChoices([]);
        if (questionID === questions.length - 1) {
            navigation.navigate('SummaryPage', {
                crcTotal: correctCount + correctUp,
                questionBank: questions,
                selectedAnswers: updatedChosenArray,
            })
        } else {
          incrementID(prev => prev +1);
        }
      }

      console.log(correctCount);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.questionPrompt}>{questions[questionID].prompt}</Text>
            <FlatList 
            data= {questions[questionID].choices}
            renderItem= {
                ({item, key}) => <View style={styles.buttons}>
                    <Button onPress={() => choiceClick(item)} title={item} key={key}  color={selectedChoices.includes(item) ? "blue" : "gray"}/>
                  </View>
            }
            />
            <View  styles={styles.buttons}>
                <Button onPress={() => handleCheckNext()} title='Next Question'/>
            </View>
          </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    content: {
      flex: 1,
      margin: 300,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    title: {
      margin: 60,
      fontSize: 50,
      fontWeight: 'bold'
    },

    buttons: {
      width: 200,
    },

    questionPrompt: {

    },
  });
