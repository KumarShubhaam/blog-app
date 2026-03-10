import fs from 'fs';
import path from 'path';

type LogType = {
  type: string,
  createdAt: Date,
  log?: string,
  author?: string
}

export default class Log {
  private author: string;

  constructor(author: string){
    this.author = author;
  }
  private writeLogFile(log_object: LogType){
    let logFilePath = path.join(path.resolve(), 'logs.txt');
    let log_string = `${JSON.stringify(log_object)}\n\n`
    fs.appendFileSync(logFilePath, log_string);
  }

  private get_log_object(type: string): LogType{
    return {
      type: type,
      createdAt: new Date(),
    }
  }

  info(msg: string){
    let log = this.get_log_object('info');
    log['log'] = msg;
    // console.log(log);
    this.writeLogFile(log);
  }

  error(msg: string){
    let log = this.get_log_object('error');
    log['log'] = msg;
    this.writeLogFile(log);
  }

}