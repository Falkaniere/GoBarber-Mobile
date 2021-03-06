import React, {useCallback, useRef} from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './style';

import logoImg from '../../assets/logo.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();


  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    }, [signIn]);


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
