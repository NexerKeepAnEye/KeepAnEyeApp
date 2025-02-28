import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState((prevState) => ({
      errorMessage: `${prevState.errorMessage}\n${error.message}`,
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong: {this.state.errorMessage}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
