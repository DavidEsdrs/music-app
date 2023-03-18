/**
 * 
 * Got from: https://stackoverflow.com/a/57625661
 * 
 */
export const cleanObj = (obj: any): any => {
    if (Array.isArray(obj)) { 
      return obj
          .map(v => (v && typeof v === 'object') ? cleanObj(v) : v)
          .filter(v => v != null); 
    } else { 
      return Object.entries(obj)
                                                            /* Check if is valid date, to avoid change valid date to blank objects  */
          .map(([k, v]) => [k, v && typeof v === 'object' && !isValidDate(v) ? cleanObj(v) : v])
          .reduce((a: any, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
    } 
  }

/**
 * 
 * Got from: https://stackoverflow.com/a/44198641
 * 
 */
export function isValidDate(date: any) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
  }