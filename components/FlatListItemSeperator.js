import React from 'react';
import {
    View,
    StyleSheet
  } from 'react-native';

//ItemSeparatorComponent
export const FlatListItemSeparator = () => <View style={styles.line} />;

const styles = StyleSheet.create({
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.5)"
    }
})