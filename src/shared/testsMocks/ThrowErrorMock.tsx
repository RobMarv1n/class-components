import { Component } from 'react';

export class ThrowErrorMock extends Component {
  componentDidMount() {
    throw new Error('Test error');
  }

  render() {
    return <div />;
  }
}
