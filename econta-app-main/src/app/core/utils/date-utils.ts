
export const listOfNamesOfMonth = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

export class dateUtils {

  private static numberToStr(num) {
    return num ? ('0' + num).slice(-2) : null;
  }
  public static dateToDateStr(d:Date) {
    let dt: any = null;
    if (d) {
      dt = this.numberToStr(d.getDate())+ '/' + this.numberToStr(d.getMonth()) + '/' +  d.getFullYear() ;
    } else {
      dt = d;
    }
    return dt;
  }

  public static timestampToDateStr(timestamp) {
    let dt: any = null;
    if (timestamp && timestamp.seconds) {
      const d = new Date(timestamp.seconds * 1000);
      dt = d.getFullYear() + '-' + this.numberToStr(d.getMonth()) + '-' + this.numberToStr(d.getDate());
    } else {
      dt = timestamp;
    }
    return dt;
  }

  public static dateStrToTimestamp(dtStr: string) {
    if (dtStr && dtStr.length >= 8) {
      const date = this.dateStrToDate(dtStr);
      return { seconds: date.getTime() / 1000 };
    } else {
      return { seconds: 0 };
    }
  }
  
  public static dateStrToDate(dtStr: string) {
    if (dtStr && dtStr.length >= 8) {
      return new Date(Number(dtStr.substr(0, 4)), Number(dtStr.substr(5, 2)), Number(dtStr.substr(8, 2)));
    } else {
      return null;
    }
  }
  public static dateStrToDateBR(dtStr: string) {
    console.log(dtStr)
    if (dtStr && dtStr.length >= 8) {
      return new Date(Number(dtStr.substr(6,4)), Number(dtStr.substr(3,2))-1, Number(dtStr.substr(0, 2)));
    } else {
      return null;
    }
  }

  public static timestampToDate(timestamp) {
    if (timestamp && timestamp.seconds) {
      const dt = new Date(timestamp.seconds * 1000);
      return dt;
    } else {
      return null;
    }
  }

}
