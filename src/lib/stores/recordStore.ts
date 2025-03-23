import { writable } from "svelte/store";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

console.log("API URL usada pelo front:", apiUrl); // Teste

export type Recorde = {
  nick: string;
  score: number;
};

export const recorde = writable<Recorde>({ nick: "Desconhecido", score: 0 });

export async function carregarRecorde() {
  try {
   const response = await fetch(`${import.meta.env.VITE_API_URL}/records`);

    if (!response.ok) {
      throw new Error("Erro ao buscar recorde.");
    }
    const data: Recorde = await response.json();
    recorde.set(data);
  } catch (error) {
    console.error("Erro ao carregar recorde:", error);
  }
}
