import http from "@/http/common-http";
import Day from "@/types/Day";
import DayDetail from "@/types/DayDetail";
interface DayResponse {
  data: Day;
}

class CalendarService {
  getDays(): Promise<Day[]>  {
    return new Promise((resolve, reject) => {
      return http.get<Day[]>(`/days`).then(resp => {
        resolve(resp.data.map(x => {
          return {...x, ...{date: new Date(x.date)}}
        }
        ));
      }).catch((err) => {
        reject(err);
      });
    })
  }

  calculateDay(id: string, puzzle?: any): Promise<DayDetail>  {
    return new Promise((resolve, reject) => {
      return http.post<DayDetail>(`/day/${id}/calculate`, {puzzle}).then(resp => {
        resp.data.date = new Date(resp.data.date);
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    })
  }
  
  getDay(id: string, puzzle?: any): Promise<DayDetail>  {
    return new Promise((resolve, reject) => {
      return http.get<DayDetail>(`/day/${id}`).then(resp => {
        resp.data.date = new Date(resp.data.date);
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    })
  }
}

export default new CalendarService();