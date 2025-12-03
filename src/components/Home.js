import React from 'react';
import { Container, Carousel, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import switchImg from '../assets/img/switch_2.jpg';
import ps5Img from '../assets/img/1366_2000.jpg';
import steamImg from '../assets/img/Steam-Deck.jpg';

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const featuredProducts = [
    {
      id: 34,
      nombre: 'Consola Nintendo Switch 2 + Pokémon Legends: Z-A',
      categoria: 'Nintendo Switch 2',
      precio: '$599.990',
      imagen: switchImg,
      badge: 'Nuevo',
      badgeVariant: 'success',
      disponible: true,
      descripcion: 'Consola Nintendo Switch 2 + Pokémon Legends: Z-A',
      modelo: 'Nintendo Switch 2',
      vendedor: 'Nintendo'
    },
    {
      id: 24,
      nombre: 'Consola Sony PlayStation 5 Slim',
      categoria: 'PlayStation 5',
      precio: '$559.990',
      imagen: ps5Img,
      badge: 'Popular',
      badgeVariant: 'primary',
      disponible: true,
      descripcion: 'PlayStation 5 Slim',
      modelo: 'PlayStation 5 Slim',
      vendedor: 'PlayStation'
    },
    {
      id: 25,
      nombre: 'Steam Deck 512GB',
      categoria: 'Handheld',
      precio: '$799.990',
      imagen: steamImg,
      badge: 'Oferta',
      badgeVariant: 'danger',
      disponible: true,
      descripcion: 'Steam Deck 512GB',
      modelo: 'Steam Deck',
      vendedor: 'Steam'
    }
  ];

  return (
    <>
      <div className="hero-section">
        <Carousel fade controls indicators interval={4000} pause="hover" className="hero-carousel">
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img className="d-block w-100 carousel-img" src={switchImg} alt="Nintendo Switch" />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption-custom">
              <h1 className="display-4 fw-bold">Nintendo Switch 2</h1>
              <p className="lead">Descubre la nueva generación de juegos portátiles</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                onClick={() => navigate('/consolas/nintendo')}
              >
                Ver Más <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img className="d-block w-100 carousel-img" src={ps5Img} alt="PlayStation 5" />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption-custom">
              <h1 className="display-4 fw-bold">PlayStation 5</h1>
              <p className="lead">Experimenta el gaming de próxima generación</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                onClick={() => navigate('/consolas/playstation')}
              >
                Explorar <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img className="d-block w-100 carousel-img" src={steamImg} alt="Steam Deck" />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption-custom">
              <h1 className="display-4 fw-bold">Steam Deck</h1>
              <p className="lead">Tu biblioteca de Steam en cualquier lugar</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                onClick={() => navigate('/consolas/portable')}
              >
                Comprar Ahora <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <main className="main-content">
        <Container>
          <section className="featured-section py-5">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Productos Destacados</h2>
              <p className="section-subtitle">Las mejores ofertas en consolas y accesorios gaming</p>
            </div>
            
            <Row className="g-4">
              {featuredProducts.map((product) => (
                <Col key={product.id} xs={12} md={6} lg={4}>
                  <Card className="product-card h-100 shadow-sm">
                    <div className="product-image-wrapper">
                      <Card.Img variant="top" src={product.imagen} className="product-image" />
                      <Badge bg={product.badgeVariant} className="product-badge">
                        {product.badge}
                      </Badge>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <div className="mb-2">
                        <span className="category-label">{product.categoria}</span>
                      </div>
                      <Card.Title className="product-title">{product.nombre}</Card.Title>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="price-text mb-0">{product.precio}</h4>
                          <Button 
                            variant="primary" 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                          >
                            <i className="fas fa-shopping-cart me-2"></i>
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section className="categories-section py-5">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Explora por Categorías</h2>
            </div>
            <Row className="g-4">
              <Col xs={12} md={4}>
                <Card className="category-card text-white border-0">
                  <Card.Body className="p-4 category-consolas">
                    <i className="fas fa-tv fa-3x mb-3"></i>
                    <h3>Consolas</h3>
                    <p>PlayStation, Xbox, Nintendo y más</p>
                    <Button 
                      variant="light" 
                      className="mt-2"
                      onClick={() => navigate('/consolas/playstation')}
                    >
                      Ver Todo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="category-card text-white border-0">
                  <Card.Body className="p-4 category-juegos">
                    <i className="fas fa-ghost fa-3x mb-3"></i>
                    <h3>Juegos</h3>
                    <p>Los últimos lanzamientos y clásicos</p>
                    <Button 
                      variant="light" 
                      className="mt-2"
                      onClick={() => navigate('/juegos/ps5')}
                    >
                      Ver Todo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="category-card text-white border-0">
                  <Card.Body className="p-4 category-perifericos">
                    <i className="fas fa-keyboard fa-3x mb-3"></i>
                    <h3>Periféricos</h3>
                    <p>Mejora tu experiencia gaming</p>
                    <Button 
                      variant="light" 
                      className="mt-2"
                      onClick={() => navigate('/perifericos/teclados')}
                    >
                      Ver Todo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          <section className="info-section py-5">
            <Row className="g-4 text-center">
              <Col xs={12} md={4}>
                <div className="info-card p-4">
                  <i className="fas fa-shipping-fast fa-3x text-primary mb-3"></i>
                  <h4 className="info-title">Envío Gratis</h4>
                  <p className="info-text">En compras superiores a $50</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="info-card p-4">
                  <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                  <h4 className="info-title">Compra Segura</h4>
                  <p className="info-text">Protección en todas tus compras</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="info-card p-4">
                  <i className="fas fa-headset fa-3x text-primary mb-3"></i>
                  <h4 className="info-title">Soporte 24/7</h4>
                  <p className="info-text">Estamos aquí para ayudarte</p>
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    </>
  );
}

export default Home;
