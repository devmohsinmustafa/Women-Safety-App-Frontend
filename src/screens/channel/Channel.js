import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ratios from '../../styles/ratios'
import { channelData } from '../../constants/Constants';

let {
  widthPixel,
  heightPixel,
  fontPixel
} = ratios;

const Channel = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.xplafes}>Channels</Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 30 }}>

        {

          channelData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.container2}
                onPress={() => navigation.navigate("ChatGPT")}
              >
                <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>

                <Text style={[styles.work, { marginLeft: widthPixel(23), }]}>{item.work}</Text>
                <Image style={{marginTop:-3}}
                 source={item.image}/>
                </View>


                <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: widthPixel(51) }} >
                  {/* <View  style={{alignSelf:'center'}}> */}
                  <Image
                    source={require("../../assets/images/circle.png")} />
                  {/* </View> */}
                  <Text style={styles.status}>{item.status}</Text>
                </View>

                <View style={{ marginLeft: widthPixel(83), marginTop:-10 }}>
                  <Text style={{color:"#372329"}}>{item.dot}</Text>
                </View>

                <View style={{ marginVertical:heightPixel(5),flexDirection: "row", marginLeft: widthPixel(30),}}>
                  <View style={{flexDirection:'column',}}>
                    <Text style={styles.member}>{item.member1}</Text>
                    <Text style={styles.member}>{item.member2}</Text>
                  </View>

                  <View style={{ flexDirection: "column", marginLeft:widthPixel(10),   }}>
                    <Text style={styles.para}>{item.para1}</Text>
                    <Text style={styles.para}>{item.para2}</Text>
                  </View>

                </View>

              </TouchableOpacity>
            )
          })

        }

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECD0",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  container1: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xplafes: {
    color: "#372329",
    fontFamily: "Nunito-SemiBold",
    fontSize: fontPixel(30),
  },
  container2: {
    justifyContent: 'center',
    // alignItems:'center',
    width: widthPixel(372),
    // width:"90%",
    height: heightPixel(130),
    backgroundColor: "#FFECD0",
    borderWidth: 1,
    borderColor: "#FF3974",
    borderRadius: 12,
    marginBottom: heightPixel(16)
  },

  work: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(22),
  },
  status: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(20),
    marginLeft:6
  },
  member: {
    color: "#FF3974",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(12),
    paddingBottom:heightPixel(6)

  },
  para: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(12),
    // backgroundColor:'yellow',
    paddingBottom:heightPixel(7),


  }
})

export default Channel;