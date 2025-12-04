import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ApiService from '../services/ApiService';
import '../styles/CategoryPage.css';

function CategoryPage({ category, type = 'perifericos' }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener productos filtrados por subcategoría
        const allProducts = await ApiService.getAllProductos();
        
        // Filtrar productos según la categoría
        // Por ahora, mostramos todos los productos ya que no tenemos subcategorías en la DB
        const filteredProducts = allProducts.filter(product => {
          // Puedes agregar lógica de filtrado cuando tengas el campo category en la DB
          return true;
        });
        
        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, type]);

  const formatPrice = (price) => {
    // Si el precio ya tiene formato ($XXX.XXX), devolverlo tal cual
    if (typeof price === 'string' && price.startsWith('$')) {
      return price;
    }
    // Si es número, formatearlo
    return `$${parseInt(price).toLocaleString('es-CL')}`;
  };

  if (loading) {
    return (
      <div className="category-page">
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3">Cargando productos...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page">
        <Container className="py-5">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
          <Button variant="primary" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left me-2"></i>
            Volver al Inicio
          </Button>
        </Container>
      </div>
    );
  }

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
                      src={product.imageUrl} 
                      alt={product.name}
                      className="product-image-detail"
                    />
                    {product.stock === 0 && (
                      <Badge bg="danger" className="unavailable-badge">
                        Agotado
                      </Badge>
                    )}
                    <Badge bg="info" className="category-badge">
                      {product.category}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <Card.Text className="product-description">
                      {product.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="product-price mb-0">{formatPrice(product.price)}</h4>
                        <Button 
                          variant={product.stock > 0 ? "primary" : "secondary"}
                          disabled={product.stock === 0}
                          className="buy-button"
                          onClick={() => addToCart(product)}
                        >
                          {product.stock > 0 ? (
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
