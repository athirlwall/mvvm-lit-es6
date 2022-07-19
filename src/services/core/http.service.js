export class HttpService {
  static async fetch(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.log(error);
        return error;
      });
  }
}
