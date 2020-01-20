import React from 'react';
import { mount } from 'enzyme';

import HelloWorld from './HelloWorld';

describe('<HelloWorld />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HelloWorld />
    );
  });

  it('should render properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
  });
})
