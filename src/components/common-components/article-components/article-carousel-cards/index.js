import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Card } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { LOAD_ARTICLES_BY_TYPE } from "../../../graphQL/Queries";
import { Link } from "react-router-dom";
import { data } from "../../../../data/routes/routesData";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1350, min: 1160 },
    items: 4,
    slidesToSlide: 4,
  },
  mobile: {
    breakpoint: { max: 1160, min: 900 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile_s: {
    breakpoint: { max: 900, min: 670 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile_xs: {
    breakpoint: { max: 670, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CarouselCardArticles = (props) => {
  const { data: dataByType } = useQuery(LOAD_ARTICLES_BY_TYPE, {
    variables: { type: props.articleByType.value },
  });

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (dataByType) {
      setArticles(dataByType.getArticleByType);
    }
  }, [dataByType]);

  return (
    <div>
      {articles.some(
        (article) => article.type === props.articleByType.value
      ) ? (
        <div className="journal-title">{props.articleByType.value}</div>
      ) : null}

      <Carousel
        responsive={responsive}
        ssr
        containerClass="container-with-dots"
        itemClass="image-item"
        deviceType={props.deviceType}
      >
        {articles.map((el, index) => (
          <Card style={{ width: "18rem" }} key={index}>
            <Link
              to={`${data.journal}${data.article}/${el.id}/display`}
              target="_blank"
              rel="noopener noreferrer"
              className="trainer-item-container"
            >
              <img src={el.cover} className="img-carousel-journal" />
              <div className="container-journal-titles">
                <h5> {el.title} </h5>
                <p> {el.type} </p>
                <p className="lire-plus">Lire plus</p>
              </div>
            </Link>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};
export default CarouselCardArticles;
