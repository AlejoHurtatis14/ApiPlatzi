import { IonItem, IonAvatar, IonLabel, IonNote, IonIcon } from "@ionic/react";
import { ProductApiPlatzi } from "../../interfaces/ProductApiPlatzi";
import { star } from "ionicons/icons";

type ListItemProductsType = {
  listProducts: Array<ProductApiPlatzi>;
  saveDesiredProduct: any;
};

const ListItemProducts: React.FC<ListItemProductsType> = ({
  listProducts,
  saveDesiredProduct,
}) => {
  return listProducts.map((product) => (
    <IonItem
      key={product.id}
      button={true}
      detail={false}
      className="ion-margin-bottom"
      lines="none"
      onClick={() => saveDesiredProduct(product)}
    >
      <IonAvatar aria-hidden="true" slot="start">
        <img
          alt="Imagen"
          src={product.images.length ? product.images[0] : "#"}
        />
      </IonAvatar>
      <IonLabel>
        <strong>{product.title}</strong>
        <br />
        <IonNote color="medium" className="ion-text-wrap">
          {product.description.length > 50
            ? product.description.substring(0, 50) + "..."
            : product.description}
        </IonNote>
      </IonLabel>

      {product.isDesired && (
        <IonIcon slot="end" aria-hidden="true" color="warning" icon={star} />
      )}
    </IonItem>
  ));
};

export default ListItemProducts;
