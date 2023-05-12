import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

interface AddTodoProps extends RouteComponentProps {
    onAddTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ history, onAddTodo }) => {
    const [text, setText] = React.useState('');

    const handleAddTodo = () => {
        if (text) {
            onAddTodo(text);
            setText('');
            history.push('/home');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Todo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput placeholder='Enter todo text' value={text} onIonChange={(e) => setText(e.detail.value!)} />
                <IonButton expand='block' onClick={handleAddTodo}>
                    Add Todo
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AddTodo;
