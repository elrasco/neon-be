const AWS = require("aws-sdk");

module.exports = {
  invokeAnalyzer: (video_id, video_url) => {
    AWS.config.region = "eu-west-1";
    var lambda = new AWS.Lambda();

    lambda.invoke(
      {
        FunctionName: "arn:aws:lambda:eu-west-1:315671387076:function:video-analyzer-dev-proxy", // your function name
        LogType: "Tail",
        InvocationType: "Event",
        Payload: JSON.stringify({
          parameters: { video_id, video_url }
        })
      },
      function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      }
    );
  }
};
