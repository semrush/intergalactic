import React from 'react';
import './error-boundary.css';

type Props = { id: string };
type State = { id: string; error: Error | null; errorInfo: React.ErrorInfo | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      id: props.id,
    } as State;
  }

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (props.id !== state.id) {
      return {
        error: null,
        errorInfo: null,
        id: props.id,
      };
    } else {
      return null;
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: info,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="intergalactic-playground_error-boundary">
          <h2>Oh-no! Something went wrong</h2>
          <div className="title">{this.state.error && this.state.error.toString()}</div>
          <div>Component Stack Error Details:</div>
          <pre className="stack-trace">{this.state.errorInfo?.componentStack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
