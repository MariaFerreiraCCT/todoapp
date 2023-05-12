import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonInput,
    IonButton,
    IonButtons,
    IonIcon,
    IonAlert,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { information, informationCircle, informationCircleOutline, trashOutline } from 'ionicons/icons';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const initialTodos: Todo[] = [{ id: 1, text: 'First Todo', completed: false }];

const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState<string>('');
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

    const handleNewTodoChange = (event: any) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() === '') return;
        const newId = todos.length + 1;
        const newTodoItem: Todo = { id: newId, text: newTodo, completed: false };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const handleToggleTodo = (todo: Todo) => {
        const updatedTodos = todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t));
        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (todoToDelete: Todo | null) => {
        if (todoToDelete) {
            setTodoToDelete(todoToDelete);
            setShowDeleteAlert(true);
        }
    };

    const handleConfirmDelete = (todoDelete: Todo | null) => {
        if (todoDelete) {
            const updatedTodos = todos.filter((t) => t.id !== todoDelete.id);
            setTodos(updatedTodos);
        }
        setShowDeleteAlert(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Todo App</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => history.push('/info')}>
                            <IonIcon slot='icon-only' icon={informationCircleOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {todos.map((todo) => (
                        <IonItem key={todo.id} className={todo.completed ? 'completed' : ''}>
                            <IonCheckbox checked={todo.completed} onIonChange={() => handleToggleTodo(todo)} />
                            <IonLabel className='todo-text'>{todo.text}</IonLabel>
                            <IonButton slot='end' color='danger' onClick={() => handleDeleteTodo(todo)}>
                                <IonIcon slot='icon-only' icon={trashOutline} />
                            </IonButton>
                        </IonItem>
                    ))}
                </IonList>

                <IonItem>
                    <IonInput placeholder='New todo' value={newTodo} onIonChange={handleNewTodoChange} />
                    <IonButton onClick={handleAddTodo}>Add</IonButton>
                </IonItem>

                <IonAlert
                    isOpen={showDeleteAlert}
                    header={'Delete Todo?'}
                    message={'Are you sure you want to delete this todo?'}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                setShowDeleteAlert(false);
                            },
                        },
                        {
                            text: 'Delete',
                            handler: () => {
                                handleConfirmDelete(todoToDelete);
                            },
                        },
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Home;
