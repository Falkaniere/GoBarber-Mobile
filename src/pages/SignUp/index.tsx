import React, { useRef, useCallback} from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './style';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={(data) => { console.log(data);}}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="users"
                placeholder="nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm() }
              />

              <Button onPress={() => formRef.current?.submitForm() }>Entrar</Button>
            </Form>
          </Container>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default SignUp;
