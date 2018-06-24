const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost:1883')

const KEY_A = 440
const notes = [...Array(88)].map((_, i) => KEY_A * Math.pow(2, (1 / 12) * (-48 + i)))

client.on('connect', function () {
  client.subscribe('M5Stack/tone')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})

let count = 0
setInterval(()=>{
  client.publish('M5Stack/tone', JSON.stringify({
    frequency: notes[count++ % 88],
    duration: 1000
  }))
}, 1000)