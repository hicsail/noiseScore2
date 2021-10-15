import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header as HeaderRNE } from 'react-native-elements';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont().then();

import { constants } from "../constants";

const assetsPath  = '../../assets';
export default class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <HeaderRNE
                leftComponent={this.props.showBack ?
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name="angle-left" color="white" size={0.09 * constants.width}/>
                        </TouchableOpacity>
                    </View>
                    : null
                }
                centerComponent={
                    <TouchableOpacity onPress={() => {console.log('center')}}>
                        <Image style={styles.image} source={require(`${assetsPath}/logo-white.png`)}/>
                    </TouchableOpacity>
                }
                rightComponent={ this.props.showAccount ? // only show account if we need to show it
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Account2')}>
                            <Icon name="user-circle" color="white" size={0.09 * constants.width}/>
                        </TouchableOpacity>
                    </View>
                    : null
                }
                backgroundColor={constants.colors.brightGreen}
                centerContainerStyle={{padding: 0}}
            />
        );
    }

};

CustomHeader.propTypes = {
    showAccount: PropTypes.bool,
    showBack: PropTypes.bool,
    navigation: PropTypes.any,
};

const styles = StyleSheet.create({
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        zIndex: -1,
    },
    image: {
        height: constants.height/10 - 10,
        width: constants.width/2 - 2, // needed this to make left clickable??
        resizeMode: 'contain',
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
