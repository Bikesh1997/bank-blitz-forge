pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  environment {
    SERVER_IP = "65.1.111.82"
    DEPLOY_PATH = "/var/www/react-app"
  }

  stages {

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
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

          # create folder if not exists
          ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} \
          'sudo mkdir -p ${DEPLOY_PATH} && sudo chown ubuntu:ubuntu ${DEPLOY_PATH}'

          # fast incremental deploy
          rsync -avz --delete \
          -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
          dist/ ubuntu@${SERVER_IP}:${DEPLOY_PATH}/

          # reload nginx safely
          ssh -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} \
          'sudo systemctl reload nginx'
          """
        }
      }
    }

    stage('Test') {
      when { expression { false } }
      steps {
        sh 'npm test -- --watchAll=false'
      }
    }
  }

  post {
    success { echo '✅ Build Successful & Deployed 🚀' }
    failure { echo '❌ Build Failed' }
  }
}
