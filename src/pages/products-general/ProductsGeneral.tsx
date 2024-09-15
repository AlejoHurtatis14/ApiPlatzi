import {
  IonContent,
  IonNote,
  IonPage,
  IonSearchbar,
  IonText,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import "./ProductsGeneral.css";
import Header from "../header/header";
import { useState } from "react";
import DesiredProductService from "../../services/desired-product/desired-product";
import { ProductApiPlatzi } from "../../interfaces/ProductApiPlatzi";
import ListItemProducts from "../list-items-products/ListItemProducts";
import { DesiredProduct } from "../../interfaces/DesiredProduct";
import { useAuth } from "../../contexts/AuthContext";

const ProductsGeneral: React.FC = () => {
  const [productsApi, setProductsApi] = useState<Array<ProductApiPlatzi>>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [present] = useIonToast();
  const { currentUser } = useAuth();

  useIonViewWillEnter(() => {
    getProdsDesireduser();
  });

  const searchValueInList = (value: any) => {
    setSearchValue(value);
    DesiredProductService.filterProducts(value)
      .then(({ data }: { data: Array<ProductApiPlatzi> }) => {
        setProductsApi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveDesiredProduct = (product: ProductApiPlatzi) => {
    let desiredProduct: DesiredProduct = {
      description: product.description,
      id: product.id,
      images: product.images.length ? [product.images[0]] : [],
      title: product.title,
      idUser: currentUser.id,
    };
    if (product.isDesired) {
      deleteProductDesired(desiredProduct, product);
    } else {
      saveProductDesired(desiredProduct, product);
    }
  };

  const saveProductDesired = (
    desiredProduct: DesiredProduct,
    product: ProductApiPlatzi
  ) => {
    DesiredProductService.saveDesiredProduct(desiredProduct)
      .then((response) => {
        if (response) {
          updateDesiredProduct(product.id, true);
          presentToast("Producto agregado a deseado", "top");
        } else {
          presentToast("No fue posible agregar el producto", "top");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProductDesired = (
    desiredProduct: DesiredProduct,
    product: ProductApiPlatzi
  ) => {
    DesiredProductService.deleteDesiredProduct(desiredProduct)
      .then((response) => {
        if (response) {
          updateDesiredProduct(product.id, false);
          presentToast("Producto eliminado de deseados", "top");
        } else {
          presentToast("No fue posible eliminar el producto", "top");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDesiredProduct = (idProduct: number, isDesired: boolean) => {
    setProductsApi((products) =>
      products.map((product: ProductApiPlatzi) =>
        product.id === idProduct ? { ...product, isDesired } : product
      )
    );
  };

  const getProdsDesireduser = () => {
    DesiredProductService.getDesiredProductsUser(currentUser.id)
      .then((desiredProducts: Array<DesiredProduct>) => {
        getProdsApiPlatzi(desiredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProdsApiPlatzi = (desiredProducts: Array<DesiredProduct>) => {
    DesiredProductService.getProducts()
      .then(({ data }: { data: Array<ProductApiPlatzi> }) => {
        data = data.map((product: ProductApiPlatzi) => {
          return findDesairedProduct(desiredProducts, product);
        });
        setProductsApi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findDesairedProduct = (
    desiredProducts: Array<DesiredProduct>,
    product: ProductApiPlatzi
  ) => {
    let findIndexProd = desiredProducts.findIndex(
      (p: DesiredProduct) => p.id === product.id
    );
    if (findIndexProd != -1) {
      product.isDesired = true;
    }
    return product;
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
      <Header title="Productos" />

      <IonContent fullscreen className="ion-padding">
        <IonNote>Selecciona el producto para agregar a favoritos</IonNote>

        <IonSearchbar
          value={searchValue}
          onIonChange={(e: any) => searchValueInList(e.detail.value)}
          onIonClear={(e: any) => searchValueInList("")}
          animated={true}
          placeholder="Buscar..."
        ></IonSearchbar>

        {productsApi.length ? (
          <ListItemProducts
            listProducts={productsApi}
            saveDesiredProduct={saveDesiredProduct}
          />
        ) : (
          <IonText className="ion-text-center" color="tertiary">
            <h3>No se encontraron productos relacionados</h3>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductsGeneral;
