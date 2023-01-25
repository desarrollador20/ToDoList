import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";


export const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: "95%",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1.3,
    marginBottom: normalize(20, 'height'),
    paddingHorizontal: normalize(15, 'height'),
    paddingVertical: normalize(15, 'height'),
    borderColor: 'gray'
  },


  containerLabels: {
    flex: 5,
    alignSelf: 'center',
    paddingLeft: normalize(10),
  },

  containerArrow: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },

  lblNumQuestions: {
    fontSize: RFPercentage(1.8),
    color: '#999999'
  },

  lblUserAssigned: {
    fontSize: RFPercentage(2.5),
    color: "#00a680"
  },


  lblTaskName: {
    fontSize: RFPercentage(2.3),
  }
});
