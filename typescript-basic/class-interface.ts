interface Radio {
  switchRadio(trigger: boolean): void;
}

interface Battery {
  checkBatteryStatus(): void
}

// 接口继承
interface RadioWithBattery extends Radio {
  checkBatteryStatus(): void
}

class Car implements Radio {
  switchRadio(trigger: boolean) {
    
  }
}

// 要实现多个接口，我们只需要中间用 逗号 隔开即可。
class Cellphone implements Radio, Battery {
  switchRadio(trigger: boolean) {
    
  }
  checkBatteryStatus() {
    
  }
}

// 要实现所有接口中定义的属性
class Cellphone2 implements RadioWithBattery {
  checkBatteryStatus(): void {
    throw new Error("Method not implemented.");
  }
  switchRadio(trigger: boolean) {
    
  }
}