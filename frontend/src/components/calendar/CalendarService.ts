import http from "@/http/common-http";

class CalendarService {
  getDays(): Promise<any>  {
    return new Promise((resolve, reject) => {
      return http.get(`/days`).then(resp => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err)
      });
    })
  }

  getDay(id: string): Promise<any>  {
    return new Promise((resolve, reject) => {
      return http.get(`/day/${id}`).then(resp => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err)
      });
    })
  }
}

export default new CalendarService();