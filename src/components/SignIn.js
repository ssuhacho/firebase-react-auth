import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    
    try{
      setError('')
      setLoading(true)
      await signIn(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch{
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="mt-3">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
            Sign in
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to ="/signup">Create one!</Link>
      </div>
    </div>
  );
};

export default SignIn;
