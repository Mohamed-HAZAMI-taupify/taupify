import React from "react";
import ImageLoader from "../image-loader";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CarouselCard({ data }) {
  return (
    <Carousel>
      {data.map((el, index) => (
        <Carousel.Item key={index}>
          <ImageLoader
            alt={el._id + " background"}
            className="pic"
            src={el.cover}
          />
          <div className="carousel-caption carousel-caption-journal">
            <h3>{el.type}</h3>
            <h2>{el.title}</h2>
            <Link
              to={`/to-meta/journal/article/${el.id}/display`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LIRE PLUS
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}