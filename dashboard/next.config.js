module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.dynatrace.com'],
  },
  publicRuntimeConfig: {
    jenkinsUrl: process.env.JENKINS_URL,
    jenkinsUser: process.env.JENKINS_USER,
    jenkinsPassword: process.env.JENKINS_PASSWORD,
  }
}
