import { CreateCloudResourceData, GetCloudResourceAccessTokenData, GetCloudResourcesData, GetUserCloudResourcesData, UpdateCloudResourceData } from "@/interfaces/cloud-resources";
import { API_URL, apiRequest } from "./api";

export const getCloudResources = async (): Promise<GetCloudResourcesData[]> => {
    return apiRequest<GetCloudResourcesData[]>("/cloud-resources");
}

export const getUserCloudResources = async (): Promise<GetUserCloudResourcesData[]> => {
    return apiRequest<GetUserCloudResourcesData[]>("/cloud-resources/mine");
}

export const createCloudResource = async (data: CreateCloudResourceData) => {
    return apiRequest<CreateCloudResourceData>("/cloud-resources", {
        method: "POST",
        body: data
    })
}

export const getCloudReourceAccessToken = async (id: number): Promise<GetCloudResourceAccessTokenData> => {
    return apiRequest<GetCloudResourceAccessTokenData>(`/cloud-resources/${id}/token`)
}

export const updateCloudResource = async (id: number, data: UpdateCloudResourceData) => {
    return apiRequest<UpdateCloudResourceData>(`/cloud-resources/${id}`, {
        method: "PATCH",
        body: data
    })
}

export async function getCloudResourceProgress<T>(
    onMessage: (message: T) => void,
    onError?: (error: Error) => void
  ) {
    try {
      const token = localStorage.getItem("authToken");
      
      const eventSource = new EventSource(`${API_URL}/cloud-resources/progress?token=${token}`);
  
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
  