import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default About = () => {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', marginHorizontal: 10 }}>
        <Text>
          OpenAI was founded in December 2015, by SpaceX co-founder and Tesla CEO Elon Musk, Greg Brockman from notable data startup Cloudera, and entrepreneur Rebekah Mercer. Dimitry Ioffe, Pieter Abbeel, and Patrick Mynyk are also notable founding members of OpenAI. The organization was created with the goal of advancing digital intelligence in the way that is most likely to benefit humanity as a whole. OpenAI has partnerships with investment firms such as Fidelity Investments, Andreessen Horowitz, and Obvious Ventures. Ever since it’s creation, OpenAI has made large contributions to both its citizens and AI as a whole. OpenAI Zero is an AI research lab focused on developing artificial intelligence where any AI software program can autonomously defeat any other in a much faster amount of time. OpenAI started developing this project in early 2017 and completed it by late 2017. This was a significant development as it showed that the current state of AI technology is far from any End Game Scenario.
        </Text>
      </SafeAreaView>
    );
  }