import React from 'react';
import { IonCheckbox, IonItem, IonLabel } from '@ionic/react';
import { ContractProps } from '../models/ContractProps';

interface ContractPropsExt extends ContractProps {
  onEdit: (_id?: string) => void;
}

const Contract: React.FC<ContractPropsExt> = ({ _id, team, salary, dateFrom, dateTo, onEdit }) => {
  return (
    <IonItem onClick={() => onEdit(_id)}>
      <IonLabel>{team}</IonLabel>
      <IonLabel>{salary}</IonLabel>
      <IonLabel slot="end">DateFrom: {dateFrom.split('T')[0]}</IonLabel>
      <IonLabel slot="end">DateTo: {dateTo.split('T')[0]}</IonLabel>
    </IonItem>
  )
}

export default Contract;