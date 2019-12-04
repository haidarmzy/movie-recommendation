import * as React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const TabBar = (props) => {
  const { 
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
   } = props
   const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View style={{
      height: 65,
      backgroundColor: 'seashell',
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 10,
      borderTopColor: '#ccc',
      borderWidth: 1
    }}>
    {navigation.state.routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
      return (
        <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}>

            {renderIcon({ route, focused: isRouteActive, tintColor })}

            <Text>{getLabelText({ route })}</Text>
          </TouchableOpacity>
        // <Tab 
        //   focusAnim={focusAnim}
        //   title={route.routeName} 
        //   onPress={() => navigation.navigate(route.routeName)}
        // />
      )
    })}
    </View>
  )
}

const S = StyleSheet.create({
    container: { flexDirection: "row", height: 52, elevation: 2 },
    tabButton: { flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 10 }
  });

export default TabBar