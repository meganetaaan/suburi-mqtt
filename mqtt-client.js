const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
  client.subscribe('M5Stack/tone')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})

let count = 0;
setInterval(()=>{
  client.publish('M5Stack/tone', String(count++))
}, 1000)