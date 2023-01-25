import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";


export const styles = StyleSheet.create({

  container: {
    marginBottom: normalize(50),
    marginTop: normalize(50)
  },

  containerSwich: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center'
  },

  SwitchStyle: {
    alignSelf: 'flex-start',
    marginRight: normalize(7)
  },


  labelSwicht: {
    fontSize: RFPercentage(2.5),
  },


});
