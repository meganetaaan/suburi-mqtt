class VOscillator {
  constructor() {
    this.ctx = new AudioContext()
    this.osc
  }

  // 音を鳴らす
  sound(freq) {
    // Failed to execute 'start' on 'AudioScheduledSourceNode': cannot call start more than once.
    // というエラーがでるので、音を鳴らす度にオシレーターを再生成する
    this.osc = this.ctx.createOscillator()
    this.osc.frequency.value = freq
    this.osc.connect(this.ctx.destination)

    this.osc.start()
  }

  // 音を止める
  stop() {
    if (this.osc != null) {
      this.osc.stop()
    }
  }
}

const oscillator = new VOscillator()
const client = mqtt.connect()
client.subscribe("M5Stack/tone")
client.on("message", function (topic, payload) {
  const p = JSON.parse(payload)
  console.log(p)
  oscillator.stop()
  oscillator.sound(p.frequency)
})
