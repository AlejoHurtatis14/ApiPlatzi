/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { AuthProvider } from "./contexts/AuthContext";
import { IonReactRouter } from "@ionic/react-router";
import { listOutline, bagCheckOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import DesiredProducts from "./pages/desired-products/DesiredProducts";
import Guard from "./guard/guard";
import Login from "./pages/Login/login";
import ProductsGeneral from "./pages/products-general/ProductsGeneral";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Guard>
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/products-general">
                    <ProductsGeneral />
                  </Route>
                  <Route exact path="/desired-products">
                    <DesiredProducts />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/login" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="productsGeneral" href="/products-general">
                    <IonIcon aria-hidden="true" icon={listOutline} />
                  </IonTabButton>
                  <IonTabButton tab="desiredProducts" href="/desired-products">
                    <IonIcon aria-hidden="true" icon={bagCheckOutline} />
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </Guard>
          </IonRouterOutlet>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
