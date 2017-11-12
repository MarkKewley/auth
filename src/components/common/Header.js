import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { headerText } = props;
    const { textStyle, viewStyle } = styles;

    return (
        <View style={ viewStyle }>
            <Text style={ textStyle }>{ headerText }</Text>
        </View>
    );
};

const styles = {

    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // no horizontal just vertical shadow
        shadowOpacity: 0.2, // how heavy it is
        elevation: 2,
        position: 'relative'
    },

    textStyle: {
      fontSize: 20
    }
};

export { Header };
