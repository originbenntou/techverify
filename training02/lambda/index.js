const { CloudWatchLogsClient, PutLogEventsCommand } = require('@aws-sdk/client-cloudwatch-logs')

const client = new CloudWatchLogsClient()

exports.handler = async (event) => {
  const input = {
    logGroupName: 'SESNotification',
    logStreamName: 'SESNotificationStream',
    logEvents: [
      {
        timestamp: Date.now(),
        message: event['Records'][0]['Sns']['Message'],
      },
    ],
  }
  const command = new PutLogEventsCommand(input)
  await client.send(command)
}