import React from 'react';
import Input from '../../Components/Input/Input';
import classes from './Login.module.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component {
    state = {
        formData: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Type your username'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Type your password'
                },
                value: '',
            }
        },
        error: '',
        userData: [],
    }

    componentDidMount() {
        Axios.get('https://blogapp-85fe6.firebaseio.com/users.json')
            .then(res => {
                if (res.data) {
                    const entries = Object.entries(res.data);
                    const data = [];
                    for (let e in entries) {
                        data.push({
                            username: entries[e][1].username,
                            password: entries[e][1].password,
                            fullname: entries[e][1].fullname,
                            id: entries[e][0]
                        })
                    }
                    this.setState({ userData: data });
                }
                else {
                    this.setState({ userData: [] });
                }
            })
            .catch(err => {
                this.setState({ error: err.message });
            })
    }

    onChangeHandler = (event, id) => {
        const selectedItem = {
            ...this.state.formData[id]
        };
        const formDataCopy = {
            ...this.state.formData
        }
        selectedItem.value = event.target.value;
        formDataCopy[id] = selectedItem;
        this.setState({ formData: formDataCopy, error: '' });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const userIndex = this.state.userData.findIndex(e => {
            return e.username === this.state.formData.username.value
        });
        if (userIndex >= 0) {
            if (this.state.userData[userIndex].password === this.state.formData.password.value) {
                localStorage.setItem('username', this.state.formData.username.value);
                localStorage.setItem('fullname', this.state.userData[userIndex].fullname);
                localStorage.setItem('loggedin', true);
                this.props.history.push('/');
            }
            else {
                this.setState({ error: 'Invalid Password!' });
            }
        }
        else {
            this.setState({ error: 'Invalid username' });
        }
    }

    render() {
        const finalFormdata = [];
        for (let e in this.state.formData) {
            finalFormdata.push({
                id: e,
                elementType: this.state.formData[e].elementType,
                elementConfig: this.state.formData[e].elementConfig,
                value: this.state.formData[e].value
            })
        }

        return (
            <div className={classes.Loginpage}>
                <h4>
                    Login to <NavLink to='/'>Writer</NavLink>
                </h4>
                <form className={classes.Loginform} onSubmit={this.submitHandler}>
                    {finalFormdata.map(e => {
                        return <Input key={e.id}
                            elementType={e.elementType}
                            elementConfig={e.elementConfig}
                            value={e.value}
                            changed={(event) => this.onChangeHandler(event, e.id)}
                        />
                    })}
                    <input type="submit" value='Login' />
                    <p style={{ fontStyle: 'italic', color: 'red' }}>{this.state.error}</p>
                    <p>Don't have an account?<NavLink to='/signup'>Signup</NavLink></p>
                </form>
            </div>
        )
    }
}


export default Login;