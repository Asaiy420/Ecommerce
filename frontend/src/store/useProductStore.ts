import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

interface Product {
    _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
  category: string;
}

interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  createProduct: (productData: CreateProductInput) => Promise<void>;
  fetchAllProducts: () => Promise<void>;
  updateProduct: (id:string,productData: CreateProductInput) => Promise<void>;
  deleteProduct: (id:string) => Promise<void>;
  toggleFeaturedProduct: (id:string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/products", productData);

      set((prevState) => ({
        products: [...prevState.products, res.data], // add the new product to the state
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
        set({ loading: false });
      } else {
        toast.error("An unexpected error occurred when creating products");
        set({ loading: false });
      }
    }
  },
 
  fetchAllProducts: async () => {
    set({loading:true});

    try {
        const res = await axiosInstance.get("/products");
        set({products: res.data.products, loading:false})
    } catch (error) {
        if (error instanceof AxiosError){
            toast.error(error.response?.data?.message || "An error occurred");
            set({loading:false})
        }else{
            toast.error("An unexpected error occurred when fetching products");
            set({loading:false})
        }
    }
  },

  updateProduct: async (id: string, productData: CreateProductInput) => {
    set({loading:true})
    
  },

  deleteProduct: async (id: string) => {
    set({loading: true})
    try{
        await axiosInstance.delete(`/products/${id}`);
        set((prevState) => ({
            products: prevState.products.filter((product) => product._id !== id, ),
            loading:false
        }))

    }catch(error){
        if (error instanceof AxiosError){
            toast.error(error.response?.data?.message || "An error occurred");
            set({loading: false})
        }else{
            toast.error("An unexpected error occurred when deleting products");
            set({loading: false})
        }
    }
  },

  toggleFeaturedProduct: async (id: string) => {
    set({loading: true})
  },


}));
