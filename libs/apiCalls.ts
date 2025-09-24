import axios from "axios";

export type Option = {
  _id: string;
  name: string;
  amount: string;
  available: boolean;
};

export async function getAllOptions(): Promise<Option[]> {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : "";

    const response = await axios.get(`${baseUrl}/api/options`);
    return response.data.options;
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
}


