import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageSkeleton from "../../../common-components/image-loader/ImageSkeleton";
const CoachCard = (props) => {
  const { image, i, name, coach, id_resamania, k } = props;

  return (
    <motion.div className="coachthumbnail">
      <motion.div className="frame" whileHover="hover">
        <Link
          to={`/tm/coach-image/${k}/${i}/${id_resamania.replace(

            "/everestsportclubbesancon/coaches/",
            ""
          )}`}
          className="trainer-item-container"
        >
          <div className="item-container-cover">
            <ImageSkeleton
              alt="Everest home page"
              className="first-section-background"
              src={image}
            />
          </div>
          <div className="trainer-item-container-cartouche">
            <ul className="coach-list">
              {coach.activities.map((e, index) => (
                <li key={index}>{e.label}</li>
              ))}
            </ul>
            <span className="title-coach">{name}</span>
            <div className="position-coach">
              <img
                src="https://i.ibb.co/dLdKbz6/position.png"
                className="position-coach-icon"
              />
              <span>BESANCON</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CoachCard;
