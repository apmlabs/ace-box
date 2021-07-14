### Use case: Canary + auto remediation

# Shift traffic

At the moment, the load generator is calling the service's ingress. Although both versions (*build 1* and faulty *build 4*) of our service are deployed, 100% of the traffic is routed to *build 1*, the current "live" version. We can now start to shift traffic to the service's canary version (*build 4*).

## 1. Use AWX to route traffic to the canary

1. Go to AWX (see the dashboard for credentials)
2. Under "Templates", launch "canary" with it's default settings

    ![awx_template_canary](../assets/images/awx_template_canary.png)

A playbook is run which slowly increases the percentage of traffic that is routed to the canary. With each incrementation step an event is pushed to Dynatrace to make it aware of the service's configuration change. When you visit the application in your browser ( `http(s)://simplenodeservice.canary.<ingress domain>` ) the likelyhood of reaching the new service is steadily increasing up to the point where you'll only see the new version.
