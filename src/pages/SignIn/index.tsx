import React, {useCallback, useRef} from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './style';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

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

            <Form ref={formRef} onSubmit={handleSignIn}>

              <Input
               name="email"
               icon="mail"
               placeholder="email"
               autoCorrect={false}
               autoCapitalize="none"
               keyboardType="email-address"
               returnKeyType="next"
               onSubmitEditing={() => {
                passwordInputRef.current?.focus();
               }}
              />

              <Input
               ref={passwordInputRef}
               name="password"
               icon="lock"
               placeholder="senha"
               secureTextEntry
               returnKeyType="send"
               onSubmitEditing={() => {formRef.current?.submitForm(); }}
              />

              <Button onPress={() => {formRef.current?.submitForm(); }}>Entrar</Button>
            </Form>

            <ForgotPassword onPress={() => {console.log('deu'); }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>

          <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
          </CreateAccountButton>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default SignIn;
