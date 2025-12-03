import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import '../styles/CategoryPage.css';

function CategoryPage({ category, type = 'perifericos' }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const categoryTitles = {
    'teclados': 'Teclados Gaming',
    'mouse': 'Mouse Gaming',
    'audifonos': 'Audífonos Gaming',
    'volantes': 'Volantes de Carreras',
    'controles': 'Controles',
    'playstation': 'PlayStation',
    'nintendo': 'Nintendo',
    'xbox': 'Xbox',
    'portable': 'Consolas Portátiles',
    'ps5': 'Juegos PS5'
  };

  const categoryIcons = {
    'teclados': 'fa-keyboard',
    'mouse': 'fa-mouse',
    'audifonos': 'fa-headphones',
    'volantes': 'fa-steering-wheel',
    'controles': 'fa-gamepad',
    'playstation': 'fab fa-playstation',
    'nintendo': 'fas fa-star',
    'xbox': 'fab fa-xbox',
    'portable': 'fas fa-mobile-alt',
    'ps5': 'fas fa-ghost'
  };

  const products = productsData[type]?.[category] || [];

  return (
    <div className="category-page">
      <div className="category-hero">
        <Container>
          <Button 
            variant="outline-light" 
            onClick={() => navigate('/')}
            className="back-button mb-4"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Volver al Inicio
          </Button>
          <h1 className="category-title">
            <i className={`fas ${categoryIcons[category]} me-3`}></i>
            {categoryTitles[category]}
          </h1>
          <p className="category-subtitle">
            Descubre nuestra selección de {categoryTitles[category].toLowerCase()} de alta calidad
          </p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4}>
                <Card className="product-card-detail h-100">
                  <div className="product-image-container">
                    <Card.Img 
                      variant="top" 
                      src={product.imagen} 
                      alt={product.nombre}
                      className="product-image-detail"
                    />
                    {!product.disponible && (
                      <Badge bg="danger" className="unavailable-badge">
                        Agotado
                      </Badge>
                    )}
                    <Badge bg="info" className="category-badge">
                      {product.categoria}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-name">{product.nombre}</Card.Title>
                    <Card.Text className="product-description">
                      {product.descripcion}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="product-price mb-0">{product.precio}</h4>
                        <Button 
                          variant={product.disponible ? "primary" : "secondary"}
                          disabled={!product.disponible}
                          className="buy-button"
                          onClick={() => addToCart(product)}
                        >
                          {product.disponible ? (
                            <>
                              <i className="fas fa-shopping-cart me-2"></i>
                              Agregar
                            </>
                          ) : (
                            'No Disponible'
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p className="no-products">No hay productos disponibles en esta categoría</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default CategoryPage;
