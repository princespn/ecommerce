import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryMenu() {
  const categories = [
    { name: "Women Ethnic", path: "/category/women-ethnic" },
    { name: "Women Western", path: "/category/women-western" },
    { name: "Men", path: "/category/men" },
    { name: "Kids", path: "/category/kids" },
    { name: "Home & Kitchen", path: "/category/home-kitchen" },
    { name: "Beauty & Health", path: "/category/beauty-health" },
    { name: "Jewellery & Accessories", path: "/category/jewellery-accessories" },
    { name: "Bags & Footwear", path: "/category/bags-footwear" },
    { name: "Electronics", path: "/category/electronics" }
  ];

  return (
    /* 
      Bootstrap classes:
      - overflow-x-auto: lets mobile viewports swipe horizontally
      - border-top / bg-white: layout framing
    */
    <div className="w-100 bg-white px-4 border-top overflow-x-auto">
      <div className="d-flex align-items-center justify-content-start justify-content-lg-between gap-4 py-2">
        {categories.map((cat, idx) => (
          <Link 
            key={idx} 
            to={cat.path} 
            className="text-decoration-none fw-semibold text-dark opacity-75 link-primary opacity-100-hover text-nowrap py-1"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}