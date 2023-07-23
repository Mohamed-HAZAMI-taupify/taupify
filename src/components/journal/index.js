
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import SectionPreinscription from "../common-components/section-preinscription";
import CarouselCard from "../common-components/carousel-card";
import CarouselCardArticles from "../common-components/article-components/article-carousel-cards";
import { typesData } from "../../data/articleData";
import { useQuery } from "@apollo/client";
import { LOAD_ARTICLES_BY_IS_TREND } from "../graphQL/Queries";

const Journal = () => {
  //dataByIsTrend : contient les articles dont l'attribut isTrend est true
  const { data: dataByIsTrend } = useQuery(LOAD_ARTICLES_BY_IS_TREND, {
    variables: { isTrend: true },
  });

  const [trendList, setTrendList] = useState([]);

  useEffect(() => {
    if (dataByIsTrend) {
      setTrendList(dataByIsTrend.getArticleByIsTrend);
    }
  }, [dataByIsTrend]);

  return (
    <div className="journal-interface">
      <SectionPreinscription
        backgroundImg={
          "https://i.ibb.co/bWLZj5N/f7491c90-4b9f-4e91-ae50-8762bf906648.jpg"
        }
      />

      <section className="section-journal">
        {/* //carousel des articles à la une  */}
        <CarouselCard data={trendList} />
      </section>
      <section className="section-cards" id="jump">
        {typesData.map((el, index) => (
          <CarouselCardArticles key={index} articleByType={el} index={index} />
        ))}
      </section>
    </div>
  );
};

export default Journal;
