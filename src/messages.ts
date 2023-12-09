import { Players } from "./types";
import { getRandomNumber } from "./utils";

export const HELP_MESSAGE = `
Список команд
/players - вывести список игроков
/sex - трахнуть случайного игрока на сервере
`;

export const START_MESSAGE = "Привет. это бот для сервера Друзья Артёма";
export const UNKNOWN_COMMAND_MESSAGE = "Я не знаю такую команду";
export const ERROR_MESSAGE = "Произошла странная ошибка";
export const EMPTY_SERVER_MESSAGE = "На сервере нет игроков";

export function getPlayerInfoMessage(players: Players) {
  const { now, sample } = players;
  const playersList = sample.reduce((value, player, index) => {
    return value + `${index + 1}: ${player.name}\n`;
  }, "");
  return `Сейчас игроков: ${now}\n${playersList}`;
}

export function getSexMessage(players: Players) {
  const { sample } = players;
  const length = sample.length;
  const randomPlayer = sample[getRandomNumber(length)];
  return `Вы трахнули ${randomPlayer.name}`;
}
