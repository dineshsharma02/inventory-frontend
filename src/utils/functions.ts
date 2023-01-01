import { message, notification } from "antd";
import Axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { tokenName } from "./data";
import { GroupUrl, InventoryUrl, MeUrl, ShopUrl } from "./network";
import { AuthTokenType, DataProps, UserType, CustomAxiosError, GroupProps, InventoryProps, InvoiceCreationProps, ShopProps } from "./types";

// this method provides the bearer token
export const getAuthToken = (): AuthTokenType | null => {
  const accessToken = localStorage.getItem(tokenName);
  console.log(tokenName);
  if (!accessToken) {
    return null;
  }
  return {
    
      Authorization: `Bearer ${accessToken}`,
  
  };
};

// functionality for logging out
export const logout = () => {
  localStorage.removeItem(tokenName);
  window.location.href = "/login";
};

export const authHandler = async (): Promise<UserType | null> => {
  const response = await axiosRequest<UserType>({
    url: MeUrl,
    hasAuth: true,
    showError: false,
  });

  if (response) {
    return response.data;
  }

  return null;
};

interface AxiosRequestProps {
  method?: "get" | "post" | "patch" | "delete";
  url: string;
  payload?: DataProps | FormData ;
  hasAuth?: boolean;
  showError?: boolean;
  errorObject?: {
    message: string;
    description?: string;
  };
}

export const axiosRequest = async <T>({
  method = "get",
  url,
  payload,
  hasAuth = false,
  errorObject,
  showError = true,
}: AxiosRequestProps): Promise<AxiosResponse<T> | null> => {
  const headers = hasAuth ? getAuthToken() : {};

  const response = (await Axios({
    method,
    url,
    data: payload,
    headers: { ...headers } as any,
  }).catch((e: CustomAxiosError) => {
    if (!showError) return;
    notification.error({
      message: errorObject ? errorObject.message : "Operation Error",
      description: errorObject?.description
        ? errorObject.description
        : e.response?.data.error,
    });
  })) as AxiosResponse<T>;

  if (response) {
    return response;
  }

  return null;
};


export const getGroups = async(setGroups: (data: GroupProps[])=> void, setFetching:(val:boolean)=>void) =>{
    
  const response = await axiosRequest<{results:GroupProps[]}>({
    url:GroupUrl,
    hasAuth:true,
    showError: false,
  })

  if (response){
    // console.log(response);
    console.log(response.data.results);
    
    
    const data = response.data.results.map(item=>({
      ...item, belongsTo: item.belongs_to ?
      item.belongs_to.name: "Not Defined"
    }))
    setGroups(data)
    setFetching(false)
    
    
  }
}


  export const getInventories = async (
    setInventory: (data: InventoryProps[]) => void, 
    setFetching: (val:boolean) => void
) => {
    const response = await axiosRequest<InventoryProps[]>({
      url: InventoryUrl,
      hasAuth: true,
      showError: false
    })

    if (response){
      console.log(response.data);
      
      const data = response.data.map(
        (item) => ({...item, 
                    photoInfo: item.photo,
                      groupInfo: item.group.name
                    
      }))
      setInventory(data)
      setFetching(false)
      
    }
  }



  export const getTotal = (invoiceData: InvoiceCreationProps[]) => {
    return invoiceData.reduce((sum:number, item:InvoiceCreationProps) => {
      sum += item.price * item.qty
      return sum
    }, 0)
  }



  export const getShops = async (
    setShop: (data: ShopProps[]) => void, 
    setFetching: (val:boolean) => void
) => {
    const response = await axiosRequest<{results:ShopProps[]}>({
      url: ShopUrl,
      hasAuth: true,
      showError: false
    })

    if(response){
        const data = response.data.results.map(
            (item) => 
            ({...item, created_by_email: (item.created_by.email as string)}))
        setShop(data)
      setFetching(false)
    }
  }