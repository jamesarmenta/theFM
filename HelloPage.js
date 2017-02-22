import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';

const propTypes = {
  toRoute: PropTypes.func.isRequired,
};

class HelloPage extends React.Component {
  constructor(props) {
      super(props);

      this.nextPage = this.nextPage.bind(this);
  }

  nextPage() {
    this.props.toRoute({
      name: "A new screen",
      component: HelloPage
    });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.nextPage} underlayColor="transparent">
          <Text>Next page please!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

HelloPage.propTypes = propTypes;

export default HelloPage;