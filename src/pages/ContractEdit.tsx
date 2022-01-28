import {
  IonButton,
  IonButtons,
  IonContent, IonDatetime,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { ContractProps } from "../models/ContractProps";
import { ContractContext } from "../components/ContractProvider";

interface ContractEditProps extends RouteComponentProps<{ id?: string }> {
}

const ContractEdit: React.FC<ContractEditProps> = ({ history, match }) => {
  const { contract, saving, savingError, saveContract } = useContext(ContractContext);
  const [team, setTeam] = useState('');
  const [salary, setSalary] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [cont, setCont] = useState<ContractProps>(); 
  useEffect(() => {
    const routeId = match.params.id || '';
    const cont = contract?.find(t => t._id === routeId);
    console.log(cont);
    setCont(cont);
    if (cont) {
      setTeam(cont.team);
      setSalary(cont.salary);
      setDateFrom(cont.dateFrom);
      setDateTo(cont.dateTo);
    }
  }, [match.params.id, contract]);
  const handleSave = () => {
    const editedCont = cont ? { ...cont, team, salary, dateFrom, dateTo } : { team, salary, dateFrom, dateTo };
    saveContract && saveContract(editedCont).then(() => history.goBack());
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Edit
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput value={team} onIonChange={e => setTeam(e.detail.value || '')}/>
        <IonInput value={salary} onIonChange={e => setSalary(e.detail.value || '')}/>
        <IonDatetime value={dateFrom} onIonChange={e => setDateFrom(e.detail.value || '')} placeholder="Select Date"/>
        <IonDatetime value={dateTo} onIonChange={e => setDateTo(e.detail.value || '')} placeholder="Select Date"/>
        <IonLoading isOpen={saving}/>
        {savingError && (
          <div>{savingError.message || 'Failed to save item'}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ContractEdit;