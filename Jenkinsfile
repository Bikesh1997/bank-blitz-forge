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
            keyFileVariable: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQChQRwe3WPyGu08J8n5DkYxCzQlUXo2/AHrBGUaLOiZbx+zP/yhv/ue5nyGYoPmbAgXz6WsXFEf2nRsgy6Bhob4ClPt2/oTZYDXeijoe099DEQAPplPEUzVln/f6GWhGjQYg0hwz6KLGw5wpEOO2Bu2EOuSn+9qZHSCxHDZL0koY76lshzfctNIDo+soocVZxQxmhBqX1eD8t4t4DO/yp9/ITwG9Zozy2ifrw3ozhJ8lb8QFI12EXQJ9HiHLV/mS4FUXD/c8lYWMvEverw82Up+2doFbHFjmKOy+/Nn/f342HgmBmHlvD1dhKrxm2nRlTI9VznOmwZ3KzyVAHNQBKqOAptEcMXDlr8n63G9iKBO/kjk2ODCH5pJakz2kTX4VE45GH6COuaprEQ6CSh1CP52+Ilo1Ru9rgecspTGOzJa/JZnXGOuxxM3M8EBxv0ARSUGyekNqyx3uzn87Rl5dYBrMhOFYlzUXAsHXTZm+WZYVdh4fVAssLN9NRpQVEAgL3ypy+QMNMTdlnRttBC/O32IDXgTg9lxvFsLAPycro0Ft01Kl8a6PIDDtRiGFEzUQY2v2yWq6EgDKYQns/lnTQyR+aA7lAy7f49TZ56tF0nXUE4UCMob3aNKAS7osopOFsLP+uFoW+hMB2IvifR8NLzzJ7J9vkAk9F8m2I0zsXlgnQ== jenkins@b43217303ff9'
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
