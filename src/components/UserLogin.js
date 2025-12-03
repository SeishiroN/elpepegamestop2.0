import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function UserLogin({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar estado de error cuando el usuario escribe
    if (submitStatus === 'error') {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.email || !formData.password) {
      setSubmitStatus('error');
      return;
    }

    // Aquí iría la lógica de autenticación
    console.log('Intentando iniciar sesión:', formData);
    
    // Simulación de login exitoso
    setSubmitStatus('success');
    
    setTimeout(() => {
      setFormData({
        email: '',
        password: ''
      });
      setSubmitStatus(null);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="user-login-form">
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-3">
          <i className="fas fa-check-circle me-2"></i>
          ¡Inicio de sesión exitoso!
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="mb-3">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Revisar elementos ingresados
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Correo Electrónico
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            <i className="fas fa-sign-in-alt me-2"></i>
            Iniciar Sesión
          </Button>
        </div>

        <div className="text-center mt-3">
          <a href="#recuperar" className="text-muted small">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </Form>
    </div>
  );
}

export default UserLogin;

