import React from 'react';
import { mount } from 'enzyme';

import App from './App';

jest.mock('react-router-dom', () => {
  const React = require('react');
  const { PureComponent } = React;

  return {
    BrowserRouter: class Router extends PureComponent {
      render() {
        return this.props.children;
      }
    },
    Route: () => <div />,
  };
});

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <App />
    );
  });

  it('should render properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
  });
});
