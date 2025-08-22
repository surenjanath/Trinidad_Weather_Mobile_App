import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide tab bar to match single screen design
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather',
        }}
      />
    </Tabs>
  );
}