pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  stages {

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to EC2') {
    steps {
        withCredentials([sshUserPrivateKey(
            credentialsId: 'aws-server-key',
            keyFileVariable: '-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAuS+SA+4acWoLBVe5hIXvb8dvBez/LzGa8jpDhq43FGNLA6GP
BhqkcfTtG83k2xfvkoI35fkSF/ok8nNQEeMuN576J8wfjUfswZ9MyJua/R2vsKeM
g8fsCVU66qLPkO5w3qozA4DIzr/Ff/NtJv1cKPBZ19g+A74NU86+HDXikIC7s7ps
OqM97FmzLOsb5Oj0NRLvd6tm1EEzuqG5E1omHOBdau0Gr60EfhRARgqtU0oIdc6t
FG6M55QNyTfq4EqfZfdlcdHk7XoQeqUh+JIel34E8cOeQIIbDmkSJBg7uSFm5esG
3TIFfdmyGriK+ivO6wDClkvImKojv0WSogNUGwIDAQABAoIBAESNtKsZyNY1YHEQ
4Y+KmXGyzYnPC0SoQ2jqYrcH5UH54/orI6wpzriU5/XECbWFrd15sUHEK4uOwYCz
aW/FvwU+J/L1oLSHbMDcvOsCl6SeCb0GuYDLULi/wXi83sQTUNtM/GeOlEfdPDq6
nayyXByXpVq/JW3zPDHLNhtxYzcEn4ZTLf34kbkzXldlZ3uU7oWQ6HiZYMRvdwiI
lZQ2b5xb/g2kLeCBe3oC5p+b6ED9yCw+/sw7tVoF5gAeEEwSu9kdYEKSD4iSF/Lf
yAXidu+PNXGRYSpD23w1MAjRWhcPNt0OI1gVofpF+r1rzrUittJbyGs1oQ87fufL
31r/JSECgYEA5du2wQ1BQ8q0xqmvr7AP0fMKn16q2HteyKYSubk9CXN4g6TH9Em7
XfvXyeiVdLAhojA/MSIGs29oX5zrzMKpA6rwChPuq1MfmB9GoR3Ili53B06U0Bo1
u52s9x74KXMXB8rckixeCdQEWj/VZT4o9MVrf5+wfYpZ4fKbxugUs2sCgYEAzj85
yTzzkKgrbGTNls3+ig1HZwLVjZmYzZ01vNW6r4EcshIt8Mh8B0ZvO0InjM+fihhd
Z4Fjqi22s5trOxm0pRIUZSYgvdfqzebQyBrM8WmAKIs7WrRxZD2lV67T4IGlIyLl
gps6gTsEgpYHwCmLzk6KCWRjYuTm5QuIrqruvhECgYBqnXSxKrLA/P7IvuAsf193
JGIi9cgMzXxzWQSKfK8g+RxHA2Fzn9d2il/W2TipfSC8l+BXq86r39rrrl95BDlc
6CaaphAoC1A2QRuDk8r8TeUL0JkZxW5y7XnSzdyRbT6bcK7KZiXgLSUvrzgN070v
e3qXIby9HjT+poc2xWMErQKBgQDN2BqTd4rcSIu2TlFGfufZ3vDxpcl/3tm79XjJ
tELzoRgDvdMuKtpm5Gxlp1wT1LC1QiYPBPt0wNVFIwv922UJDydd4JTzBMmroP+l
h+Id2572WCfwGoHFeyVHgwyiWKJ5k/2ewdC9ZCrXLmgj6RNI3+gzAYeUD0NHPKC5
O462EQKBgQDMD9qFjJo+J/P/QUilpQ64rAC6SDbugtAqCzfTuknEsbpzOROWClt0
CaldbVkLgJAhzYasIuqCr6E2459+7yMqGk8ifvDghTMQWKdtjAjoiFmcgB14j/k/
OIl8fJgNFbR/49JhO8UEvdPeRAbOXEL2lzLqlIQoAM7V7n58uA0BHg==
-----END RSA PRIVATE KEY-----'
        )]) {
            sh """
            chmod 600 $SSH_KEY
            scp -i $SSH_KEY -o StrictHostKeyChecking=no -r build/* ubuntu@65.1.111.82:/var/www/react-app
            ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@65.1.111.82 'sudo systemctl restart nginx'
            """
        }
    }
}


    stage('Test') {
      when {
        expression { false }   // still disabled
      }
      steps {
        sh 'npm test -- --watchAll=false'
      }
    }
  }

  post {
    success {
      echo '✅ Build Successful & Deployed 🚀'
    }
    failure {
      echo '❌ Build Failed'
    }
  }
}
