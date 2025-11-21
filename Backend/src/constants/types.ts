export enum GameStatus {
  WAITING = "waiting",
  RUNNING = "running",
  FINISHED = "finished",
}

export interface userType {
  userid: string;
  score: number;
}

export interface roomType {
  host: string;
  players: userType[];
  roomStatus: GameStatus;
}
