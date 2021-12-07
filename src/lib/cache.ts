export class Cache {
    static retrieve(key: string) {
      let result;
  
      try {
        result = JSON.parse(localStorage.getItem(key));
      } catch {
        result = undefined;
      }
      console.log('stored:' + result);
      return result;
    }
  
    static storeWithKey(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  