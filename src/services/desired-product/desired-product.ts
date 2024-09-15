import { DesiredProduct } from "../../interfaces/DesiredProduct";
import { storage, getJsonObject } from "../../storage/storage";
import RequestAxiosSvc from "../general/request-axios";

const DesiredProductService = {
    getProducts: () => {
        return RequestAxiosSvc.get();
    },
    filterProducts: (value: string) => {
        return RequestAxiosSvc.filterProducts(value);
    },
    saveDesiredProduct: async (product: DesiredProduct): Promise<boolean> => {
        try {
            let desiredProducts: Array<DesiredProduct> | null = await getJsonObject('desiredProducts');
            if (desiredProducts) {
                desiredProducts.push(product);
                storage.set('desiredProducts', JSON.stringify(desiredProducts));
            } else {
                storage.set('desiredProducts', JSON.stringify([product]));
            }
            return true;
        } catch (error) {
            console.log('error al guardar producto deseado', error);
        }
        return false;
    },
    deleteDesiredProduct: async (product: DesiredProduct): Promise<boolean> => {
        try {
            let desiredProducts: Array<DesiredProduct> | null = await getJsonObject('desiredProducts');
            if (desiredProducts) {
                let indexFind = desiredProducts.findIndex(prod => prod.id == product.id);
                if (indexFind != -1) {
                    desiredProducts.splice(indexFind, 1);
                    storage.set('desiredProducts', JSON.stringify(desiredProducts));
                }
            } else {
                storage.set('desiredProducts', JSON.stringify([product]));
            }
            return true;
        } catch (error) {
            console.log('error al eliminar producto deseado', error);
        }
        return false;
    },
    getDesiredProductsUser: async (idUser: number): Promise<Array<DesiredProduct>> => {
        try {
            let desiredProducts: Array<DesiredProduct> | null = await getJsonObject('desiredProducts');
            if (desiredProducts) {
                return desiredProducts.filter(product => product.idUser == idUser);
            }
        } catch (error) {
            console.log('error al obtener productos de usuario', error);
        }
        return [];
    }
}

export default DesiredProductService;
