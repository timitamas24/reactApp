import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ContractList from './pages/ContractList';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { ContractProvider } from './components/ContractProvider';
import ContractEdit from './pages/ContractEdit';
import { AuthProvider } from "./auth/AuthProvider";
import { Login } from "./auth/Login";
import { PrivateRoute } from "./auth/PrivateRoute";
import React from "react";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>
          <Route exact path="/login" component={Login}/>
          <ContractProvider>
            <PrivateRoute path="/contracts" component={ContractList} exact={true}/>
            <PrivateRoute path="/contract" component={ContractEdit} exact={true}/>
            <PrivateRoute path="/contract/:id" component={ContractEdit} exact={true}/>
          </ContractProvider>
          <Route exact path="/">
            <Redirect to="/contracts"/>
          </Route>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
