import { useQuery } from "@tanstack/react-query";

import api from "../api/index";
import { ApiQuery } from "@/types";

const useApiQuery = ({queryKey, url, config}: ApiQuery) =>{
    return useQuery({
        queryKey: queryKey,
        queryFn: async() => {
            const {data} = await api.get(url, config);
            return data;
        }
    })
}


export default useApiQuery;