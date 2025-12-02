import {fetchPublicAPI} from "@/api/fetch.public.api";

export interface IRegisterRequest {
    email: string;
    password: string;
}

export interface IRegisterResponse {
    id: number;
    email: string;
    password: string; // Hash'lenmiş password (frontend'de kullanılmaz)
    name: string | null;
    surname: string | null;
    phone: string | null;
    role: string; // "user", "admin", vb.
}

export async function registerAPI(request: IRegisterRequest): Promise<IRegisterResponse> {
    return fetchPublicAPI<IRegisterResponse>(process.env.NEXT_PUBLIC_BACKEND_API_URL + 'auth/register', {
        method: 'POST',
        body: JSON.stringify(request),
    })
}
