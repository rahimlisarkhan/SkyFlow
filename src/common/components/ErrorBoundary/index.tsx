import React, { Component, ReactNode } from "react";

import { withTranslation } from "react-i18next";

import { formatDateTime } from "@/common/utils/date";

interface ErrorBoundaryProps {
  children: ReactNode;
  t: (key: string) => string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Error caught by boundary:", error, errorInfo);

    if (process.env.NODE_ENV == "development") return;

    try {
      console.log(process.env.NODE_ENV);

      const webhookUrl =
        "https://hooks.slack.com/services/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";

      const message = {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🚨 Front End Error Alert | app.rezneed.com",
              emoji: true,
            },
          },

          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Error message:*\n${error}`,
              },
              {
                type: "mrkdwn",
                text: `*Time:*\n${formatDateTime(new Date().toISOString())}`,
              },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Error Info:*\n\`\`\`${JSON.stringify(errorInfo, null, 2)}\`\`\``,
            },
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(message),
      });
    } catch (slackError) {
      console.error("Failed to send error to Slack:", slackError);
    }
  }

  render() {
    if (this.state.hasError) {
      return <p>Something error</p>;
    }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
