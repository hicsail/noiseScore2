import { Dimensions, PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';

const NOISE_SOURCES = [

    { val: 'airplane', text: 'airplane', icon: 'airplane' },
    { val: 'alarm', text: 'alarm', icon: 'alarm-light' },
    { val: 'car music', text: 'car music', icon: 'car-wash' },
    { val: 'construction', text: 'construction', icon: 'wrench' },

    { val: 'delivery', text: 'delivery', icon: 'truck-delivery' },
    { val: 'dog', text: 'dog', icon: 'dog-side' },
    { val: 'fireworks', text: 'fireworks', icon: 'star' },
    { val: 'footsteps', text: 'footsteps', icon: 'walk' },
    { val: 'horn', text: 'horn', icon: 'bullhorn' },
    { val: 'hvac', text: 'hvac', icon: 'air-conditioner' },

    { val: 'leaf blower', text: 'leaf blower', icon: 'leaf' },
    { val: 'music', text: 'music', icon: 'music' },
    { val: 'neighbor', text: 'neighbor', icon: 'human-male' },
    { val: 'party', text: 'party', icon: 'glass-cocktail' },
    { val: 'pickup', text: 'pickup', icon: 'truck' },

    { val: 'quiet', text: 'quiet', icon: 'volume-low' },
    { val: 'restaurant', text: 'restaurant', icon: 'silverware-fork-knife' },
    { val: 'traffic', text: 'traffic', icon: 'car' },
    { val: 'trains', text: 'trains', icon: 'train' },
    { val: 'trash', text: 'trash', icon: 'delete' },

    { val: 'voices', text: 'voices', icon: 'comment' },
    { val: 'other', text: 'other', icon: 'checkbox-blank-circle-outline' }

];

const requestPermission = () => {
    if(Platform.OS === 'ios') return Promise.resolve(true);
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            'title': '',
            'message': 'Please allow NoiseScore to access your location.'
        }
    ).then(granted => {
        if(granted === PermissionsAndroid.RESULTS.GRANTED) {
            return Promise.resolve("Location access granted.")
        } else {
            return Promise.reject("Location permission denied.")
        }
    })
};

const getCoordinates = () => {
    return requestPermission().then(ok => {
        return new Promise((resolve, reject) => {
            const options = Platform.OS === 'android' ? {enableHighAccuracy:true,timeout:20000}
                : {enableHighAccuracy:true,timeout:5000,maximumAge:2000};
            Geolocation.getCurrentPosition(resolve, reject, options);
        })
    })
};


export const constants = {
    colors: {
        brightGreen: "#31BD4B",
        darkGray: "#383838",
    },
    IP_ADDRESS: (Platform.OS === 'ios') ? 'localhost:9000' : '10.0.2.2:9000',
    // IP_ADDRESS: '3.12.168.21:9000', // AWS EC2 instance address, use for prod
    isAndroid: Platform.OS !== 'ios',
    isSignedIn: false,
    getCoordinates,
    NOISE_SOURCES,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
