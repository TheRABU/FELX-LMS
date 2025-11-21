import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const TabsLayoyt = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: (props) => (
            <Ionicons
              name="home-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: (props) => (
            <Ionicons
              name="trophy-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: (props) => (
            <Ionicons
              name="person-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayoyt;
