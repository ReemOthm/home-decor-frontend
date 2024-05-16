import { useQuery } from "@tanstack/react-query";
import api from "../api/index";
import { Agit stapiQuery } from "@/types";

const useApiQuery = ({queryKey, method, url, config}: ApiQuery) =>{
    return useQuery({
        queryKey: queryKey,
        queryFn: async() => {
            if(method == 'get'){
                const {data} = await api.get(url, config);
                return data.data.items;
            } 
            else if(method == 'post'){
                const {status} = await api.post(url, config);
                return status;
            }
            else if(method == 'put'){
                const {status} = await api.put(url, config);
                return status;
            }
            else if(method == 'delete'){
                const {status} = await api.delete(url, config);
                return status;
            }
        }
    })
}


export default useApiQuery;