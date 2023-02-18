import { useAppSelector } from "../../hooks";
import { getSimilarCameras } from "../../store/data-process/selector";
import SimilarProduct from "../similar-product/similar-product";

function SimilarProductsList(): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

  return (

    <div className="product-similar__slider-list">
      {
        similarCameras.map((similarCamera) => (
          <SimilarProduct similarCamera={similarCamera} key={similarCamera.id} />
        ))
      }
    </div>
  );
}

export default SimilarProductsList;
