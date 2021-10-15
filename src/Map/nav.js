import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "./MapScreen";
import HeatmapFilters from "./HeatmapFilters";


const MapStack = createNativeStackNavigator();
export default function Map() {
    return (
        <MapStack.Navigator initialRouteName="Map1" screenOptions={{headerShown: false}}>
            <MapStack.Screen name="Map1" component={MapScreen} />
            {/*<MapStack.Screen name="Map1" component={MapScreen} options={getHeader(false)}/>*/}
            <MapStack.Screen name="HeatmapFilters" component={HeatmapFilters} />
            {/*<MapStack.Screen name="HeatmapFilters" component={HeatmapFilters} options={getHeader(true)}/>*/}
        </MapStack.Navigator>
    );
}
