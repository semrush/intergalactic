import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      example: props.example,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.example !== state.example) {
      return {
        error: null,
        errorInfo: null,
        example: props.example,
      };
    } else {
      return null;
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      error: error,
      errorInfo: info,
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div style={{ textAlign: 'center' }}>
          <h2>{'Oh-no! Something went wrong'}</h2>
          <p style={{ color: '#FE5252', fontWeight: 'bold', fontSize: '32px' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <div>{'Component Stack Error Details: '}</div>
          <pre style={{ color: '#FE5252', fontSize: '24px', lineHeight: 2 }}>
            {this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}

export default ErrorBoundary;
