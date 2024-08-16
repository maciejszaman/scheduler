const ParseErrorMessage = (errorCode: string): string => {
  let message: string;

  switch (errorCode) {
    case "auth/wrong-password":
      message = "Nieprawidłowe dane logowania";
      break;
    case "auth/network-request-failed":
      message = "Błąd sieci. Sprawdź połączenie z internetem.";
      break;
    case "auth/too-many-requests":
      message = "Za dużo zapytań. Spróbuj ponownie za chwilę.";
      break;
    case "auth/user-disabled":
      message =
        "Twoje konto zostało wyłączone lub usunięte. Skontaktuj się z administratorem.";
      break;
    case "auth/requires-recent-login":
      message = "Zaloguj się ponownie.";
      break;
    case "auth/email-already-exists":
      message = "Adres e-mail jest już w użyciu.";
      break;
    case "auth/user-not-found":
      message = "Nie znaleziono konta powiązanego z tym adresem e-mail.";
      break;
    case "auth/invalid-email  ":
      message = "Adres e-mail jest nieprawidłowy.";
      break;
    default:
      message = "Coś poszło nie tak. Spróbuj ponownie później.";
      break;
  }

  return message;
};

export default ParseErrorMessage;
