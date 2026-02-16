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
            keyFileVariable: 'SSH_KEY'
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
