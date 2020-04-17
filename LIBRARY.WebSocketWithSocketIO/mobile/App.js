import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import io from 'socket.io-client';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chatMessage: "",
      chatMessages: [],
    }
  }

  componentDidMount() {
    this.socket = io('http://192.168.1.43:3000');
    this.socket.on('chat message', msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      }
      )
    }
    );
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => this.setState({ chatMessage })}
        />

        {chatMessages}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    height: 40,
    borderWidth: 2
  }
});