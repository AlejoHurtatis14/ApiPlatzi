import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const submitForm = async (e: any) => {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="center-content ion-margin-end ion-margin-start">
          <form onSubmit={submitForm}>
            <div className="ion-margin-bottom">
              <IonInput
                label="Correo electrónico"
                labelPlacement="floating"
                fill="outline"
                type="text"
                placeholder="Correo electrónico"
                value={email}
                onIonChange={(e: any) => setEmail(e.detail.value)}
              ></IonInput>
            </div>

            <div className="ion-margin-bottom">
              <IonInput
                label="Contraseña"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Contraseña"
                value={password}
                onIonChange={(e: any) => setPassword(e.detail.value)}
              ></IonInput>
            </div>

            <div className="center-button">
              <IonButton disabled={(email == "" || password == "")} type="submit">
                Ingresar
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
