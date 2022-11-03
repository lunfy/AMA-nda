import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const { colors } = useTheme()

export default styles = StyleSheet.create({
    reqContainer: {
        justifyContent: 'center', 
        marginTop: 10, 
        paddingHorizontal: 10, 
        borderRadius: 10, 
        backgroundColor: colors.card
    }
})