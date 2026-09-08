import React from 'react';
import Header from '../../Pages/home/Header.jsx';
import PromoBanner from '../../Component/Ttopbanner/HeroBanner.jsx';
import TrustStrip from '../../Component/Ttopbanner/TrustStrip.jsx';
import Footer from '../../Pages/home/Footer.jsx';

export default function Index() {
//  const navigate = useNavigate();

  // Handler for opening product details page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };


  return (
    <div className="bg-light min-vh-100 vw-100 d-flex flex-column m-0 p-0 position-relative overflow-x-hidden">
      
      <Header />
      <PromoBanner />
      <TrustStrip />
      <main className="container-fluid py-5 flex-grow-1 px-4 px-md-5">
  <div className="row g-4">
    
    {/* 📁 LEFT COLUMN: Filter & Category Dropdown Menu Accordion */}
    <aside className="col-12 col-lg-3">
      <div className="card border-0 shadow-sm p-3 sticky-lg-top" style={{ top: '90px', zIndex: 10 }}>
        <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-funnel fs-5 text-primary"></i> Filter Products
        </h5>
        
        <div className="accordion accordion-flush" id="filterAccordion">
          
          {/* Dropdown Section 1: Categories */}
          <div className="accordion-item border-0">
            <h2 className="accordion-header" id="headingCategories">
              <button className="accordion-button fw-semibold text-dark px-0 bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategories">
                Department
              </button>
            </h2>
            <div id="collapseCategories" className="collapse show" data-bs-parent="#filterAccordion">
              <div className="accordion-body px-0 pt-1 pb-3">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="catMen" />
                  <label className="form-check-label text-secondary small" htmlFor="catMen">Men's Apparel</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="catWomen" />
                  <label className="form-check-label text-secondary small" htmlFor="catWomen">Women's Apparel</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="catHealth" />
                  <label className="form-check-label text-secondary small" htmlFor="catHealth">Health Essentials</label>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Section 2: Price Range */}
          <div className="accordion-item border-0">
            <h2 className="accordion-header" id="headingPrice">
              <button className="accordion-button collapsed fw-semibold text-dark px-0 bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrice">
                Price Interval
              </button>
            </h2>
            <div id="collapsePrice" className="collapse" data-bs-parent="#filterAccordion">
              <div className="accordion-body px-0 pt-1 pb-3">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="priceRange" id="price1" />
                  <label className="form-check-label text-secondary small" htmlFor="price1">Under $25</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="priceRange" id="price2" />
                  <label className="form-check-label text-secondary small" htmlFor="price2">$25 to $100</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="priceRange" id="price3" />
                  <label className="form-check-label text-secondary small" htmlFor="price3">Over $100</label>
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Section 3: Availability */}
          <div className="accordion-item border-0">
            <h2 className="accordion-header" id="headingStock">
              <button className="accordion-button collapsed fw-semibold text-dark px-0 bg-transparent shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStock">
                Availability
              </button>
            </h2>
            <div id="collapseStock" className="collapse" data-bs-parent="#filterAccordion">
              <div className="accordion-body px-0 pt-1 pb-2">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="inStockOnly" defaultChecked />
                  <label className="form-check-label text-secondary small" htmlFor="inStockOnly">Include Out of Stock</label>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <button className="btn btn-outline-primary btn-sm w-100 mt-3 fw-bold rounded-2">
          Clear All Filters
        </button>
      </div>
    </aside>

    <section className="col-12 col-lg-9">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="col" key={item}>
                {/* 
                  1. Added cursor-pointer style
                  2. Added onClick handler to the product card
                */}
                <div 
                  className="card h-100 border-0 shadow-sm product-card transition"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleProductClick(item)}
                >
                  
                  {/* Product Image Area */}
                  <div className="bg-light position-relative text-center p-4 rounded-top-3" style={{ minHeight: '200px' }}>
                    <span className="position-absolute top-0 start-0 badge bg-danger m-3 fw-bold text-white small rounded-pill">
                      -80%
                    </span>
                    <i className="bi bi-image text-muted opacity-25" style={{ fontSize: '4rem', lineHeight: '200px' }}></i>
                  </div>

                  {/* Product Details Area */}
                  <div className="card-body p-3 d-flex flex-column">
                    <span className="text-uppercase tracking-wider font-monospace text-primary fw-bold mb-1" style={{ fontSize: '0.75rem' }}>
                      Category Tag
                    </span>
                    <h6 className="card-title fw-bold text-dark text-truncate mb-2">
                      Premium Quality Lifestyle Item #{item}
                    </h6>
                    <div className="d-flex align-items-center gap-2 mb-3 mt-auto">
                      <span className="fw-black text-dark fs-5 fw-bold">$24.00</span>
                      <span className="text-muted text-decoration-line-through small">$120.00</span>
                    </div>

                    {/* 
                      e.stopPropagation() stops the card click event 
                      so clicking "Add to Cart" won't open the detail page
                    */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Added product #${item} to cart!`);
                      }}
                      className="btn btn-primary w-100 fw-bold py-2 mt-auto rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 text-white"
                    >
                      <i className="bi bi-cart-plus fs-5"></i> Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>
  </div>

  
</main>
      <Footer />
      

      
    </div>
  );
}