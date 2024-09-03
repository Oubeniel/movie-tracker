import useSWR from "swr";
import * as UsersApi from '@/network/api/users';
import { UnauthorizedError } from "@/network/http-errors";

export default function useAuthenticatedUser() {
    const { data, isLoading, error, mutate } = useSWR("authenticated_user", //using SWR in other components, user is cached under key 'authenticated_user'
        async () => {
            try {
                return await UsersApi.getAuthenticatedUser();
            } catch (error) {
                if (error instanceof UnauthorizedError) { //if this specific error occurs, the SWR will stop retrying to get data, with any other error, it will retry every 1 or more seconds (will still retry if changing focus windows)
                    return null;
                } else throw error;
            }
        }
    );

    return {
        user: data,
        userLoading: isLoading,
        userLoadingError: error,
        mutateUser: mutate,
    }
}