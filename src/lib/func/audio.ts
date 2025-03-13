import { writable } from "svelte/store";
import { get } from "svelte/store";
import { audioEnabled } from "$lib/stores/gstores.js";

interface MusicStore {
  audio: HTMLAudioElement | null;
  currentSrc: string;
}

const music = writable<MusicStore>({ audio: null, currentSrc: "" });

export function tocarMusica(src: string): void {
  if (!audioEnabled) {
    // Se o áudio estiver desabilitado, não faz nada
    return;
  }
  music.update((m) => {
    if (m.audio) {
      m.audio.pause();
    }

    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.play();
    newAudio.volume = 0.7;

    return { audio: newAudio, currentSrc: src };
  });
}

export function tocarMusicajogar(src: string): void {
  if (!audioEnabled) {
    // Se o áudio estiver desabilitado, não faz nada
    return;
  }
  music.update((m) => {
    if (m.audio) {
      m.audio.pause();
    }

    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.play();
    newAudio.volume =0.1 ;


    return { audio: newAudio, currentSrc: src };
  });
}

export function paraMusica(): void {
  music.update((m) => {
    if (m.audio) {
      m.audio.pause();
      m.audio.currentTime = 0;
    }
    return { audio: null, currentSrc: "" };
  });
}let efeitos: HTMLAudioElement[] = [];

export function tocarSom(caminho: string, volume: number = 0.2) {
  if (!get(audioEnabled)) return;
  let efeito = new Audio(caminho);
  efeito.volume = volume; // Ajusta o volume de acordo com o parâmetro
  efeito.play().catch((err) => console.log("Erro ao tocar som:", err));
  efeitos.push(efeito);
}

export function pararTodosOsSons() {
  efeitos.forEach((efeito) => {
    efeito.pause();
    efeito.currentTime = 0;
  });
  efeitos = []; // Esvazia o array para evitar referências antigas
}
