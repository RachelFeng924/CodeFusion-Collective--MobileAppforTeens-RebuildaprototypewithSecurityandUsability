import { Pressable, StyleSheet, useColorScheme, Image } from 'react-native';
import { Link, Tabs, Stack } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function Homepage() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Image source={require('../../assets/images/safe-space-logo.png')} style={styles.logo} resizeMode='contain'/>
      <Link href="/emergency" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/SOS.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Emergency </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/contact-professional" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/contact-professional.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Contact Professional </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/document-abuse" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/document-abuse.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Document Abuse </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/safety-plan" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/safety-plan.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Safety Plan </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/self-care.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Self Care </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/warning-signs" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/warning-sign.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Warning Signs </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  backimage: {
    width: 30,
    height: 30,
    transform: [{scaleX: -1}],
    // color: '#420C5C',
  },
  button: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#420C5C',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },
  buttonText: {
    fontSize: 20,
    color: '#420C5C',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconandtext: {
    marginLeft: 15,
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  image: {
    width: 30,
    height: 30,
  },
  logo: {
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
