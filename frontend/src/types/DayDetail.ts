interface Part {
  value: string;
  duration: number; // ms
}
export default interface DayDetail {
  id: number;
  date: Date;
  part1: Part;
  part2: Part;
  puzzle: string;
}