import {DateTime} from "ts-luxon";

interface Watch {
    showTime(): string;
}

class DigitalWatch implements Watch{
    showTime(): string {
        return new Date().toTimeString().split(' ')[0];
    }
}

class AnalogWatch {

    getSecondHandAngle() {
        return +DateTime.now().toFormat('ss') * 6;
    }

    getMinuteHandAngle() {
        return +DateTime.now().toFormat('m') * 6;
    }

    getHourHandAngle() {
        return +DateTime.now().hour * 6;
    }
}

class WatchAdapter extends AnalogWatch implements Watch {

    showTime(): string {
        return `${this.getHourHandAngle()/6}:${this.getMinuteHandAngle()/6}:${this.getSecondHandAngle()/6}`;  
    }
}

const aW = new AnalogWatch()
console.log(aW.getSecondHandAngle());
console.log(aW.getMinuteHandAngle());
console.log(aW.getHourHandAngle());

const dW: Watch = new DigitalWatch()
console.log(dW.showTime());

const adapter: Watch = new WatchAdapter();
console.log(adapter.showTime());

