import React from 'react';
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import styles from './Login.module.css';

console.log(styles)

const Login = props => {
    return (
        <Form className={styles.Login}>
            <Form.Field control={Input} label='Login' placeholder='Login' />
            <Form.Field control={Input} label='Password' placeholder='Password' />
        </Form>
    )
}

export default Login;