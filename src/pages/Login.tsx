import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Image, Label, Message, Segment } from 'semantic-ui-react';

import { useDispatchContext } from '../context/AppContextProvider';
import { Action } from '../context/app-reducer';
import { ErrorResponse } from '../services/auth-service';

import profileImage from '../assets/profile.png';

const Login = () => {
    const [error, setError] = useState({} as ErrorResponse);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatchContext();
    const history = useHistory();

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        try {
            e.preventDefault();
            setError({} as ErrorResponse);

            await dispatch({ type: Action.LOG_USER_IN, data: { username, password } });

            setUsername('');
            setPassword('');

            history.push('/');
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.error);
        }
    };

    return (
        <Segment placeholder className='form-container'>
            <Form className='login-form form' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Image src={profileImage} className='profile-image' />
                <Form.Field className='form-field-container'>
                    <Form.Input
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                        className='form-field'
                    />
                </Form.Field>
                <Form.Field className='form-field-container'>
                    <Form.Input
                        placeholder='Password'
                        value={password}
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-field'
                    />
                </Form.Field>
                <Button type='submit' floated='right' className='form-field' color='blue'>
                    Submit
                </Button>
                <Message>
                    <div>
                        Not registered?{' '}
                        <Label basic color='blue' as='a' onClick={() => history.push('/register')}>
                            Register
                        </Label>
                    </div>
                </Message>
                {error?.message && (
                    <Message negative>
                        <Message.Header>{error.message}</Message.Header>
                        <Message.List>
                            {error.data?.username && <Message.Item>{error.data.username}</Message.Item>}
                            {error.data?.password && <Message.Item>{error.data.password}</Message.Item>}
                        </Message.List>
                    </Message>
                )}
            </Form>
        </Segment>
    );
};

export default Login;
