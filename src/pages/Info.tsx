import React from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface InfoProps extends RouteComponentProps {}

const Info: React.FC<InfoProps> = ({ history }) => {
    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle>Info</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ padding: '16px' }}>
                    <p>This is a todo app built with Ionic React.</p>
                    <p>You can add, complete or delete todos</p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Info;
