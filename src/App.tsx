import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { listOutline, bagCheckOutline } from "ionicons/icons";
import ProductsGeneral from "./pages/products-general/ProductsGeneral";
import DesiredProducts from "./pages/desired-products/DesiredProducts";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/login";
import { AuthProvider } from "./contexts/AuthContext";
import Guard from "./guard/guard";

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
