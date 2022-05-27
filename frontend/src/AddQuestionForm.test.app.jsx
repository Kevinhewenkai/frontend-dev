import { shallow } from 'enzyme';
import React from 'react'
import AddQuestionForm from './components/AddQuestionForm';
import Button from '@mui/material/Button';

describe('Add question form', () => {
  it('render 1 button', () => {
    const wrapper = shallow(<AddQuestionForm submit={() => {}}/>)
    expect(wrapper.find(Button)).to.have.lengthOf(1);
  })
});
