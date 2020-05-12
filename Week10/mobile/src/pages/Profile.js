import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile ({ navigation }){
    const { github_username } = navigation.state.params;

    return <WebView source={{ uri: `https://github.com/${github_username}` }} style={{ flex: 1 }} />
}

export default Profile;