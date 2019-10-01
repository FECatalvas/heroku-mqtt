var client;

$(document).ready(function () {

  $("#btnConnect").click(function (e) {
    e.preventDefault();
    client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');
    connected = true;
    $("#status").text("Connecting....")

    client.on("connect", function () {
      console.log("Connected")
      $("#statusCheck").text("Connected!!!!!")
    })

    client.on("message", function (topic, payload) {
      console.log("Message: " + [topic, payload].join(" : "));
      $("#brokersMessage").append('<tr><td>' + topic + "</td><td>" + payload + '</td><td>'+ moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
    })

    $("#btnSubscribe").click(function (e) {
      e.preventDefault();
      console.log("Subscribe button clicked");
      var subcriberTopic = $("#subTopic").val();
      console.log(subcriberTopic);
      client.subscribe(subcriberTopic)
    });

    $("#btnPublish").click(function (e) {
      e.preventDefault();
      console.log("Publish button clicked");
      var topic = $("#pubTopic").val();
      var payload = $("#pubPayload").val();
      client.publish(topic, payload)
      console.log(topic, payload)
    })

  })

});


// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })

