import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';
import { greyColor } from '../../styles';
import { media } from '../../styles/';

const LoginContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 20rem 0;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  h2 {
    margin-bottom: 2rem;
  }

  .loginPanel {
    width: 50rem;
    padding: 8rem 4rem;
    border: 1px solid ${greyColor};
    box-shadow: 0px 0px 7px 0px #a2a2a2;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    border-radius: 5px;

    ${media.phone`
    width: 80%;
    padding: 5rem 2rem;`};
    ${media.smPhone`
    width: 90%;
    padding: 4rem 1rem;`};
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  input {
    margin-bottom: 1.5rem;
    width: 90%;
  }

  .new {
    font-size: 0.9em;
    margin-top: 3rem;

    span {
      margin-right: 0.8rem;
    }
    a {
      text-decoration: none;
      color: #0366d6;
    }
  }
`;

class Homepage extends Component {
  state = {
    userNameTerm: '',
    passwordTerm: ''
  };

  render() {
    return (
      <LoginContainer>
        <h2>Sign in to VIA.</h2>
        <div className="loginPanel">
          <form>
            <Input
              changed={e => this.setState({ userNameTerm: e.target.value })}
              value={this.state.userNameTerm}
              type={'text'}
              placeHolder="Username"
            />
            <Input
              changed={e => this.setState({ passwordTerm: e.target.value })}
              value={this.state.passwordTerm}
              type={'password'}
              placeHolder="Password"
            />
            <Button>Submit</Button>
          </form>
          <span className="new">
            New to Via? <a href="#section-2">Create an account.</a>
          </span>
        </div>
      </LoginContainer>
    );
  }
}

export default Homepage;