import {
  IonButton,
  IonButtons,
  IonContent, IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonLoading,
  IonPage, IonSearchbar, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Contract from '../components/Contract';
import { add, filter } from 'ionicons/icons'
import { ContractContext } from '../components/ContractProvider';
import { useNetwork } from "../utils/useNetwork";
import { AuthContext } from "../auth/AuthProvider";

const ContractList: React.FC<RouteComponentProps> = ({ history }) => {
  const { contract, fetchContract, fetching } = useContext(ContractContext);
  const { logout } = useContext(AuthContext);
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);
  const { networkStatus } = useNetwork();
  const [page, setPage] = useState(-1);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData()
  }, [page])

  useIonViewWillEnter(async () => {
    setPage(page + 1);
  });

  async function fetchData() {
    await fetchContract?.(page);
  }

  async function searchNext($event: CustomEvent<void>) {
    setPage(page + 1);
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Here are your contracts {!networkStatus.connected && ('- Offline')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => {
              if (logout) {
                logout();
                history.push(`/login`)
              }
            }}>
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar value={searchTerm} debounce={300} onIonChange={(e) => setSearchTerm(e.detail.value!)}/>
        <IonDatetime value={filter} onIonChange={e => setFilter(e.detail.value || '')}
                     placeholder="Select Max Deadline"/>

        <IonLoading isOpen={fetching} message="Fetching contracts"/>
        {console.log('dewkjhfnwehjfkjwehkjfhnwekjhfkewjnfew:   ', contract)}
        {contract && (
          <IonList>
            {contract.filter(cont => {
              if (filter === '') return cont.team.includes(searchTerm);
              return cont.team.includes(searchTerm) && new Date(filter).getDate() >= new Date(cont.dateTo).getDate();
            }).map(({ _id, team, salary, dateFrom, dateTo }) =>
              <Contract key={_id} _id={_id} team={team} salary={salary} dateFrom={dateFrom} dateTo={dateTo}
                    onEdit={_id => history.push(`/contract/${_id}`)}/>)}
          </IonList>
        )}
        <IonInfiniteScroll
          threshold="30px"
          disabled={disableInfiniteScroll}
          onIonInfinite={event => searchNext(event)}>
          <IonInfiniteScrollContent loadingText="Loading contracts..."/>
        </IonInfiniteScroll>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/contract')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ContractList;
