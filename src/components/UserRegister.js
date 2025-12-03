import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function UserRegister({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Aquí iría la lógica para enviar el formulario
      console.log('Datos del registro:', formData);
      setSubmitStatus('success');
      
      // Resetear formulario
      setTimeout(() => {
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          password: '',
          confirmPassword: '',
          telefono: '',
          direccion: ''
        });
        setSubmitStatus(null);
        if (onClose) onClose();
      }, 2000);
    } else {
      setErrors(newErrors);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="user-register-form">
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-3">
          <i className="fas fa-check-circle me-2"></i>
          ¡Registro exitoso! Bienvenido a ElPepe Gamestop.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="mb-3">
          <i className="fas fa-exclamation-circle me-2"></i>
          Por favor, corrige los errores en el formulario.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-user me-2"></i>
            Nombre *
          </Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
            placeholder="Ingresa tu nombre"
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-user me-2"></i>
            Apellido *
          </Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            isInvalid={!!errors.apellido}
            placeholder="Ingresa tu apellido"
          />
          <Form.Control.Feedback type="invalid">
            {errors.apellido}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Email *
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="ejemplo@correo.com"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña *
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Mínimo 6 caracteres"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Confirmar Contraseña *
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            placeholder="Repite tu contraseña"
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-phone me-2"></i>
            Teléfono *
          </Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            isInvalid={!!errors.telefono}
            placeholder="+56 9 1234 5678"
          />
          <Form.Control.Feedback type="invalid">
            {errors.telefono}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-map-marker-alt me-2"></i>
            Dirección (Opcional)
          </Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Calle, número, comuna"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            <i className="fas fa-user-plus me-2"></i>
            Registrarse
          </Button>
        </div>

        <p className="text-muted text-center mt-3 small">
          Los campos marcados con * son obligatorios
        </p>
      </Form>
    </div>
  );
}

export default UserRegister;
