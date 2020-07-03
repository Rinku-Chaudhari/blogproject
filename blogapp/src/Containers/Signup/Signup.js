import React from 'react';
import Input from '../../Components/Input/Input';
import classes from './Signup.module.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

class Signup extends React.Component {
    state = {
        formData: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Type your valid email'
                },
                rules: {
                    required: true,
                    include1: '@',
                    include2: '.com',
                    minLength: 6,
                    maxLength: 50
                },
                value: '',
                valid: false
            },
            fullname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Type your fullname'
                },
                rules: {
                    required: true,
                    minLength: 6,
                    maxLength: 50
                },
                value: '',
                valid: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Set your username'
                },
                rules: {
                    required: true,
                    notInclude: ' ',
                    minLength: 4,
                    maxLength: 50
                },
                value: '',
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Set your password'
                },
                rules: {
                    required: true,
                    minLength: 6,
                    maxLength: 50
                },
                value: '',
                valid: false
            }
        },
        error: '',
        userData: [],
        signingup: false
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

    validityChecker = (elem, id) => {
        const rules = this.state.formData[id].rules;
        let isValid = true;

        if (rules) {
            if (rules.required) {
                isValid = elem.value.trim() !== '' && isValid;
            }
            if (rules.include1) {
                isValid = elem.value.includes(rules.include1) && isValid;
            }
            if (rules.include2) {
                isValid = elem.value.includes(rules.include2) && isValid;
            }
            if (rules.notInclude) {
                isValid = !elem.value.includes(rules.notInclude) && isValid;
            }
            if (rules.minLength) {
                isValid = elem.value.length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = elem.value.length <= rules.maxLength && isValid;
            }
        }
        const elementCopy = elem;
        const formDataCopy1 = {
            ...this.state.formData
        }
        isValid ? elementCopy.valid = true : elementCopy.valid = false;
        formDataCopy1[id] = elementCopy;
        this.setState({ formData: formDataCopy1 });
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
        this.validityChecker(selectedItem, id);
        this.setState({ formData: formDataCopy, error: '' });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const userIndex = this.state.userData.findIndex(e => {
            return e.username === this.state.formData.username.value
        });


        if (!this.state.formData.email.valid && userIndex < 0) {
            this.setState({ error: 'Email must be valid' });
        }
        else if (!this.state.formData.username.valid && userIndex < 0) {
            this.setState({ error: 'Spaces are not allowed in username' });
        }
        else if (!this.state.formData.fullname.valid && userIndex < 0) {
            this.setState({ error: 'Full name must be minimum 6 character long' });
        }
        else if (!this.state.formData.password.valid && userIndex < 0) {
            this.setState({ error: 'Password must be minimum 6 character long' });
        }
        else if (userIndex >= 0) {
            this.setState({ error: 'Username already taken' });
        }
        else {
            this.setState({ signingup: true });
            Axios.post('https://blogapp-85fe6.firebaseio.com/users.json', {
                username: this.state.formData.username.value,
                email: this.state.formData.email.value,
                fullname: this.state.formData.fullname.value,
                password: this.state.formData.password.value
            })
                .then(res => {
                    this.setState({ signingup: false });
                    this.props.history.push('/login');
                })
                .catch(err => {
                    this.setState({ error: err.message });
                })
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
            <div className={classes.Signuppage}>
                <h4 style={this.state.signingup ? { display: 'none' } : null}>
                    Sign up to <NavLink to='/'>Writer</NavLink>
                </h4>
                <form className={classes.Signupform}
                    onSubmit={this.submitHandler}
                    style={this.state.signingup ? { display: 'none' } : null}>
                    {finalFormdata.map(e => {
                        return <Input key={e.id}
                            elementType={e.elementType}
                            elementConfig={e.elementConfig}
                            value={e.value}
                            changed={(event) => this.onChangeHandler(event, e.id)}
                        />
                    })}
                    <input type="submit" value='Signup' />
                    <p style={{ fontStyle: 'italic', color: 'red' }}>{this.state.error}</p>
                    <p>Already have an account?<NavLink to='/login'>Login</NavLink></p>
                </form>

                <div className={classes.Loadingview}
                    style={!this.state.signingup ? { display: 'none' } : null}>
                    <h4>Signing up.....</h4>
                </div>
            </div>
        )
    }
}


export default Signup;