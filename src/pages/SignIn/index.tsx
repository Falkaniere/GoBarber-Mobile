import React from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './style';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1}}>
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
          >
          <Container>
            <Image source={logoImg}/>
            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="email"/>

            <Input name="password" icon="lock" placeholder="senha"/>

            <Button onPress={() => {console.log('deu'); }}>Entrar</Button>

            <ForgotPassword onPress={() => {console.log('deu'); }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>

          <CreateAccountButton onPress={() => {}}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
          </CreateAccountButton>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default SignIn;
