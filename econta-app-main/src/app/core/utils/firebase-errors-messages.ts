export class FirebaseErrorsMessages {
  private static errors = {
    'auth/wrong-password': 'O e-mail ou senha está inválido.',
    'auth/user-not-found': 'O e-mail ou senha está inválido.',
    'auth/user-mismatch': 'O e-mail ou senha está inválido.',
    'auth/weak-password':
      'Sua senha não é forte o suficiente. Adicione números, letras maiúsculas e minúsculas.',
    'auth/invalid-email': 'O endereço e-mail é invalido.',
    'auth/account-exists-with-different-credential':
      'E-mail já registrado! realize o login com e-mail e senha.',
    'auth/email-already-exists': 'O endereço e-mail já está sendo utilizado.',

    'auth/invalid-credential': 'Sua credencial está inválida.',
    'auth/invalid-verification-code': 'O código da verificação está inválido.',
    'auth/invalid-verification-id': 'Sua credencial está inválida.',
    'auth/requires-recent-login': 'Por favor deslogue do aplicativo e entre novamente.'
  };

  public static getMessage(errorCode) {
    return (
      this.errors[errorCode] ||
      'Houve um erro ao realizar esta ação. Por favor, tente novamente.'
    );
  }
}
