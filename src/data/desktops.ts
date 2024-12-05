import { CreateDesktopData, GetDesktopAccessTokenData, GetDesktopsData, GetUserDesktopsData, UpdateDesktopData } from "@/interfaces/desktops";
import { API_URL, apiRequest } from "./api";

export const getDesktops = async (): Promise<GetDesktopsData[]> => {
    return apiRequest<GetDesktopsData[]>("/desktops");
}

export const getUserDesktops = async (): Promise<GetUserDesktopsData[]> => {
    return apiRequest<GetUserDesktopsData[]>("/desktops/mine");
}

export const createDesktop = async (data: CreateDesktopData) => {
    return apiRequest<CreateDesktopData>("/desktops", {
        method: "POST",
        body: data
    })
}

export const getDesktopAccessToken = async (id: number): Promise<GetDesktopAccessTokenData> => {
    return apiRequest<GetDesktopAccessTokenData>(`/desktops/${id}/token`)
}

export const updateDesktop = async (id: number, data: UpdateDesktopData) => {
    return apiRequest<UpdateDesktopData>(`/desktops/${id}/alias`, {
        method: "PATCH",
        body: data
    })
}

export const updateDesktopStatus = async (id: number, status: string) => {
    return apiRequest<UpdateDesktopData>(`/desktops/${id}/status`, {
        method: "PATCH",
        body: { status }
    })
}

export async function getDesktopProgress<T>(
    onMessage: (message: T) => void,
    onError?: (error: Error) => void
) {
    try {
      const token = localStorage.getItem("authToken");
      
      const eventSource = new EventSource(`${API_URL}/desktops/progress?token=${token}`);

      eventSource.onmessage = (event) => {
        const data: T = JSON.parse(event.data);
        onMessage(data);
      };

      eventSource.onerror = (error) => {
        console.error("Erro no SSE:", error);
        if (onError) {
          onError(new Error("Erro no SSE"));
        }
        eventSource.close();
      };

      return () => eventSource.close(); // Retorna uma função para encerrar a conexão quando não for mais necessária
    } catch (error) {
      console.error("Erro ao conectar ao SSE:", error);
      if (onError) {
        onError(error as Error);
      }
    }
}

export const deleteDesktop = async (id: number) => {
    return apiRequest(`/desktops/${id}`, {
        method: "DELETE"
    })
}
  