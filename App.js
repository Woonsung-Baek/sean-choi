import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Preferences" component={PreferencesScreen} />
        <Tab.Screen name="MyPage" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const PreferencesScreen = ({route, navigation}) => {
  const [foodCandidates, setFoodCandidates] = useState([]);
  const foodByPurpose = {
    Any: [
      'Beef',
      'Chicken',
      'Pork',
      'Fish',
      'Turkey',
      'Sushi',
      'Pasta',
      'Bulgogi',
      'Dumpling',
      'Noodles',
      'Cake',
      'Shrimp',
      'Burger',
      'Pizza',
      'Bacon',
      'Soup',
    ],
    Diet: [
      'Leafy Greens',
      'Salad',
      'Yogurt',
      'Cereal',
      'Fruits',
      'Oatmeal',
      'Beans',
    ],
    Growth: ['Beef', 'Chicken', 'Pork', 'Fish', 'Turkey'],
    Bulk: ['Beef', 'Chicken', 'Pork', 'Fish', 'Turkey', 'Tofu'],
  };
  const [purpose, setPurpose] = useState(null);
  const [eatenFoods, setEatenFoods] = useState([]);
  useEffect(() => {
    if (purpose) {
      let temp = foodCandidates.concat(foodByPurpose[purpose]);
      setFoodCandidates(temp);
    }
  }, [purpose]);
  useEffect(() => {
    if (eatenFoods.length >= 5) {
      let temp = foodCandidates.concat(eatenFoods);
      setFoodCandidates(temp);
      var item =
        foodCandidates[Math.floor(Math.random() * foodCandidates.length)];
      navigation.navigate('MyPage', {food: item});
    }
  }, [eatenFoods]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          height: 50,
          backgroundColor: '#FF730E',
          width: '100%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: '10%',
          }}>
          <Image
            source={require('./images/back.png')}
            style={{
              resizeMode: 'contain',
              width: 100,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 618,
        }}>
        <ScrollView>
          <ChatBox
            color="#FC9449"
            width="70%"
            text="What Should I Eat Today?"
            textColor="white"
            left="20%"
          />
          <ChatBox
            color="#FFECDE"
            width="60%"
            text="What is Your Purpose?"
            textColor="black"
            left="0%"
          />
          {purpose && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={purpose}
              textColor="white"
              left="60%"
            />
          )}
          {purpose && (
            <ChatBox
              color="#FFECDE"
              width="70%"
              text="What Did You Eat In Past 2 Weeks? (Enter 5)"
              textColor="black"
              left="0%"
            />
          )}
          {eatenFoods?.length >= 1 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[0]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 2 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[1]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 3 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[2]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 4 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[3]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 5 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[4]}
              textColor="white"
              left="60%"
            />
          )}
        </ScrollView>
      </View>
      {!purpose && <SelectWindow setPurpose={setPurpose} />}
      {purpose && (
        <EnterBox eatenFoods={eatenFoods} setEatenFoods={setEatenFoods} />
      )}
    </SafeAreaView>
  );
};

const EnterBox = ({eatenFoods, setEatenFoods}) => {
  const [text, onChangeText] = useState(null);
  return (
    <View
      style={{
        backgroundColor: '#FFBE8F',
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={{
          backgroundColor: 'white',
          height: 35,
          margin: 5,
          width: '80%',
          borderRadius: 10,
        }}
      />
      <Button
        title="Enter"
        onPress={() => {
          setEatenFoods([...eatenFoods, text]);
          onChangeText(null);
        }}
      />
    </View>
  );
};

const SelectWindow = ({setPurpose}) => {
  return (
    <View
      style={{
        backgroundColor: '#FFBE8F',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Any')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Any
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Diet')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Diet
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Bulk')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Bulk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Growth')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Growth
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ChatBox = ({text, width, color, textColor, left}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 50,
        width: width,
        margin: 15,
        borderRadius: 20,
        left: left,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: textColor,
          fontWeight: '600',
        }}>
        {text}
      </Text>
    </View>
  );
};

const MyPageScreen = ({route}) => {
  const {food} = route.params;
  var foodName = JSON.stringify(food).replace(/['"]+/g, '');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          top: 30,
          backgroundColor: '#FF730E',
          height: 60,
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
          }}>
          Our Recommendation is...
        </Text>
      </View>
      <Image
        source={require('./images/Pizza.png')}
        style={{
          resizeMode: 'contain',
          margin: 50,
          width: 350,
          height: 350,
        }}
      />
      <Text
        style={{
          fontSize: 50,
          fontWeight: 'bold',
        }}>
        {foodName}
      </Text>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation}) => {
  const [showAds, setShowAds] = useState(true);
  const buttonPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL('https://www.grammarly.com/');

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL('https://www.grammarly.com/');
    } else {
      Alert.alert(
        `Don't know how to open this URL: https://www.grammarly.com/`,
      );
    }
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '700',
          }}>
          What To Eat?
        </Text>
      </View>
      <Image
        source={require('./images/logo.png')}
        style={{
          resizeMode: 'contain',
          width: 200,
          height: 200,
        }}
      />
      <TouchableOpacity
        style={{
          height: 200,
          width: 200,
          backgroundColor: '#FF730E',
          borderRadius: 100,
          borderColor: '#FFC599',
          borderWidth: 20,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
        onPress={() => navigation.navigate('Preferences')}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {`Preferences\n(Click to Enter)`}
        </Text>
      </TouchableOpacity>
      {showAds && (
        <TouchableOpacity
          style={{
            top: 30,
            width: '80%',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
          onPress={buttonPress}>
          <Image
            source={require('./images/ads.png')}
            style={{
              resizeMode: 'contain',
              width: '100%',
            }}
          />
          <View
            style={{
              width: 30,
              height: 20,
              position: 'absolute',
              top: 10,
              left: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Ads
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              top: 10,
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShowAds(false)}>
            <Image
              source={require('./images/cross.png')}
              style={{
                resizeMode: 'contain',
                width: 30,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default App;
