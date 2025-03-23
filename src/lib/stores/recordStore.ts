import { writable } from "svelte/store";
const apiUrl = import.meta.env.VITE_API_URL;

export type Recorde = {
  nick: string;
  score: number;
};

export const recorde = writable<Recorde>({ nick: "Desconhecido", score: 0 });

export async function carregarRecorde() {
  try {
    const response = await fetch(`${apiUrl}/records`);
    if (!response.ok) {
      throw new Error("Erro ao buscar recorde.");
    }
    const data: Recorde = await response.json();
    recorde.set(data);
  } catch (error) {
    console.error("Erro ao carregar recorde:", error);
  }
}
