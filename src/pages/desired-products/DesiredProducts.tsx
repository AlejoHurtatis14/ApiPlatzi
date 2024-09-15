import "./DesiredProducts.css";
import { DesiredProduct } from "../../interfaces/DesiredProduct";
import { IonContent, IonPage, IonText, useIonToast, useIonViewWillEnter } from "@ionic/react";
import { ProductApiPlatzi } from "../../interfaces/ProductApiPlatzi";
import { useState } from "react";
import DesiredProductService from "../../services/desired-product/desired-product";
import Header from "../header/header";
import ListItemProducts from "../list-items-products/ListItemProducts";
import { useAuth } from "../../contexts/AuthContext";

const DesiredProducts: React.FC = () => {
  const [productsDesired, setProductsDesired] = useState<
    Array<ProductApiPlatzi>
  >([]);
  const [present] = useIonToast();
  const { currentUser } = useAuth();

  useIonViewWillEnter(() => {
    getDesiredProducts();
  });

  const getDesiredProducts = () => {
    DesiredProductService.getDesiredProductsUser(currentUser.id)
    .then((desiredProducts: Array<DesiredProduct>) => {
      let newData = desiredProducts.map((product) => {
        let newProduct: ProductApiPlatzi = {
          id: product.id,
          description: product.description,
          images: product.images,
          title: product.title,
          isDesired: true,
          category: {
            id: 0,
            image: "",
            name: "",
          },
          price: 0,
        };
        return newProduct;
      });
      setProductsDesired(newData);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const deleteProductDesired = (
    desiredProduct: DesiredProduct
  ) => {
    DesiredProductService.deleteDesiredProduct(desiredProduct)
      .then((response) => {
        if (response) {
          presentToast("Producto eliminado de deseados", "top");
          getDesiredProducts()
        } else {
          presentToast("No fue posible eliminar el producto", "top");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const presentToast = (
    message: string,
    position: "top" | "middle" | "bottom"
  ) => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };

  return (
    <IonPage>
      <Header title="Productos deseados" />
      <IonContent fullscreen className="ion-padding">
        {productsDesired.length ? (
          <ListItemProducts listProducts={productsDesired} saveDesiredProduct={deleteProductDesired} />
        ) : (
          <IonText className="ion-text-center" color="tertiary">
            <h3>No se encontraron productos deseados</h3>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DesiredProducts;
