import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

export default About = () => {

    const { colors } = useTheme()

    const styles = StyleSheet.create({
       background: {
        backgroundColor: colors.background, 
        flex: 1, alignItems: 'center', 
        marginHorizontal: 10
        },
        text: {
            color: colors.text
        }
    })

    return (
      <SafeAreaView style={ styles.background }>
        <Paragraph>
            <Text style={ styles.text }>
                OpenAI was founded in December 2015, by SpaceX co-founder and Tesla CEO Elon Musk, Greg Brockman from notable data startup Cloudera, and entrepreneur Rebekah Mercer. Dimitry Ioffe, Pieter Abbeel, and Patrick Mynyk are also notable founding members of OpenAI.
            </Text>
        </Paragraph>

        <Paragraph></Paragraph>

        <Paragraph>
            <Text style={ styles.text }>
                The organization was created with the goal of advancing digital intelligence in the way that is most likely to benefit humanity as a whole. OpenAI has partnerships with investment firms such as Fidelity Investments, Andreessen Horowitz, and Obvious Ventures.
            </Text>
        </Paragraph>  

        <Paragraph></Paragraph>

        <Paragraph>
            <Text style={ styles.text }>
                Ever since it's creation, OpenAI has made large contributions to both its citizens and AI as a whole. OpenAI Zero is an AI research lab focused on developing artificial intelligence where any AI software program can autonomously defeat any other in a much faster amount of time. OpenAI started developing this project in early 2017 and completed it by late 2017. This was a significant development as it showed that the current state of AI technology is far from any End Game Scenario.
            </Text>
        </Paragraph>      
      </SafeAreaView>
    );
  }